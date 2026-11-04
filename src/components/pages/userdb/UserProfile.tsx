import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../tanstack/auth/AuthContext';
import {
  ProfileUpdate,
  profileService,
} from '../../../tanstack/services/profileServices';
import { donationService } from '../../../tanstack/services/donationServices';
import { RootStackParamList } from '../../../navigation/types';
import { UserProfileStyles as styles } from '../../../styles/UserProfileStyles';

type Navigation = NativeStackNavigationProp<RootStackParamList, 'UserProfile'>;
type RecordValue = Record<string, unknown>;
type ProfileField = 'name' | 'email' | 'avatar';

const PROFILE_FIELDS: {
  key: ProfileField;
  label: string;
  icon: React.ComponentProps<typeof MaterialDesignIcons>['name'];
}[] = [
  { key: 'name', label: 'Full name', icon: 'account-outline' },
  { key: 'email', label: 'Email address', icon: 'email-outline' },
  { key: 'avatar', label: 'Profile picture URL', icon: 'image-outline' },
];

const isRecord = (value: unknown): value is RecordValue =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function getRecords(value: unknown): RecordValue[] {
  const records: RecordValue[] = [];
  const queue: unknown[] = [value];
  const visited = new Set<object>();

  while (queue.length > 0) {
    const current = queue.shift();
    if (Array.isArray(current)) {
      queue.push(...current);
    } else if (isRecord(current) && !visited.has(current)) {
      visited.add(current);
      records.push(current);
      for (const key of ['data', 'user', 'profile', 'account']) {
        if (current[key] !== undefined) {
          queue.push(current[key]);
        }
      }
    }
  }
  return records;
}

function getProfileRecord(value: unknown): RecordValue {
  const records = getRecords(value);
  return (
    records.find(record => {
      const name = record.name ?? record.fullName;
      const email = record.email;
      return typeof name === 'string' || typeof email === 'string';
    }) ??
    records[0] ??
    {}
  );
}

function getString(record: RecordValue, fields: string[]): string {
  for (const field of fields) {
    const value = Object.entries(record).find(
      ([key]) => key.toLowerCase() === field.toLowerCase(),
    )?.[1];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return '';
}

function getDonationList(value: unknown): RecordValue[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord);
  }
  if (!isRecord(value)) {
    return [];
  }
  for (const key of ['donations', 'items', 'results', 'history']) {
    if (Array.isArray(value[key])) {
      return (value[key] as unknown[]).filter(isRecord);
    }
  }
  return isRecord(value.data) || Array.isArray(value.data)
    ? getDonationList(value.data)
    : [];
}

function getDonationStatus(donation: RecordValue): string {
  const status = getString(donation, ['status', 'donationStatus']);
  return status || 'Posted';
}

function getInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
  return initials || 'U';
}

function isValidValue(field: ProfileField, value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }
  if (field === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  }
  if (field === 'avatar') {
    try {
      const url = new URL(trimmed);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch {
      return false;
    }
  }
  return trimmed.length >= 2;
}

export default function UserProfile() {
  const navigation = useNavigation<Navigation>();
  const { token } = useAuth();
  const [profile, setProfile] = useState<RecordValue | null>(null);
  const [donations, setDonations] = useState<RecordValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [modalError, setModalError] = useState('');
  const [donationError, setDonationError] = useState('');
  const [field, setField] = useState<ProfileField>('name');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isFieldPickerOpen, setIsFieldPickerOpen] = useState(false);
  const [newValue, setNewValue] = useState('');
  const [verifiedValue, setVerifiedValue] = useState('');
  const [cooldownStarted, setCooldownStarted] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isCurrent = true;

      const loadProfile = async () => {
        setIsLoading(true);
        setProfileError('');
        setDonationError('');
        try {
          if (!token) {
            setProfile(null);
            setDonations([]);
            throw new Error('You need to sign in again to view your profile.');
          }
          const response = await profileService.getProfile(token);
          const currentProfile = getProfileRecord(response);
          if (isCurrent) {
            setProfile(currentProfile);
            setAvatarFailed(false);
          }

          try {
            const records = getRecords(response);
            const donorId = records
              .flatMap(record => Object.entries(record))
              .find(([key, value]) => {
                const normalizedKey = key.toLowerCase();
                return (
                  ['_id', 'id', 'userid', 'donorid'].includes(normalizedKey) &&
                  (typeof value === 'string' || typeof value === 'number')
                );
              })?.[1];
            if (
              donorId === undefined ||
              donorId === null ||
              !String(donorId).trim()
            ) {
              throw new Error(
                'Your profile does not include a donor ID, so donation history is unavailable.',
              );
            }
            const donationResponse = await donationService.getDonationsByDonor(
              token,
              String(donorId),
            );
            if (isCurrent) {
              setDonations(getDonationList(donationResponse));
            }
          } catch (error) {
            if (isCurrent) {
              setDonationError(
                error instanceof Error
                  ? error.message
                  : 'Unable to load your donation history.',
              );
            }
          }
        } catch (error) {
          if (isCurrent) {
            setProfileError(
              error instanceof Error
                ? error.message
                : 'Unable to load your profile. Please try again.',
            );
          }
        } finally {
          if (isCurrent) {
            setIsLoading(false);
          }
        }
      };

      loadProfile();
      return () => {
        isCurrent = false;
      };
    }, [token]),
  );

  useEffect(() => {
    if (!cooldownStarted || cooldownSeconds <= 0) {
      return undefined;
    }
    const timer = setTimeout(() => {
      setCooldownSeconds(seconds => Math.max(0, seconds - 1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [cooldownStarted, cooldownSeconds]);

  const name = profile ? getString(profile, ['name', 'fullName']) : '';
  const email = profile ? getString(profile, ['email']) : '';
  const avatar = profile
    ? getString(profile, ['avatar', 'profilePicture', 'avatarUrl', 'image'])
    : '';
  const role = profile ? getString(profile, ['role']) : '';
  const createdAt = profile
    ? getString(profile, ['createdAt', 'created_at', 'joinedAt'])
    : '';
  const joinedDate = useMemo(() => {
    if (!createdAt) {
      return 'Member';
    }
    const date = new Date(createdAt);
    return Number.isNaN(date.getTime())
      ? 'Member'
      : `Member since ${date.toLocaleDateString(undefined, {
          month: 'short',
          year: 'numeric',
        })}`;
  }, [createdAt]);
  const activeDonations = donations.filter(donation => {
    const status = getDonationStatus(donation).toLowerCase();
    return ![
      'delivered',
      'complete',
      'completed',
      'cancelled',
      'canceled',
      'rejected',
      'expired',
    ].includes(status);
  }).length;
  const currentValue =
    field === 'name' ? name : field === 'email' ? email : avatar;
  const normalizedNewValue =
    field === 'email' ? newValue.trim().toLowerCase() : newValue.trim();
  const normalizedVerifiedValue =
    field === 'email'
      ? verifiedValue.trim().toLowerCase()
      : verifiedValue.trim();
  const normalizedCurrentValue =
    field === 'email' ? currentValue.trim().toLowerCase() : currentValue.trim();
  const canConfirm =
    isValidValue(field, newValue) &&
    isValidValue(field, verifiedValue) &&
    normalizedNewValue === normalizedVerifiedValue &&
    normalizedNewValue !== normalizedCurrentValue;

  const clearConfirmation = () => {
    setCooldownStarted(false);
    setCooldownSeconds(0);
  };

  const openEditor = () => {
    setField('name');
    setNewValue(name);
    setVerifiedValue('');
    setModalError('');
    clearConfirmation();
    setIsEditOpen(true);
  };

  const closeEditor = () => {
    setIsEditOpen(false);
    setIsFieldPickerOpen(false);
    setModalError('');
    clearConfirmation();
  };

  const selectField = (newField: ProfileField) => {
    setField(newField);
    setNewValue(
      newField === 'name' ? name : newField === 'email' ? email : avatar,
    );
    setVerifiedValue('');
    setModalError('');
    setIsFieldPickerOpen(false);
    clearConfirmation();
  };

  const confirmChange = async () => {
    if (!canConfirm || isSaving) {
      return;
    }
    if (!cooldownStarted) {
      setCooldownStarted(true);
      setCooldownSeconds(3);
      return;
    }
    if (cooldownSeconds > 0) {
      return;
    }
    if (!token) {
      setModalError('You need to sign in again before changing your profile.');
      return;
    }

    const value =
      field === 'email' ? newValue.trim().toLowerCase() : newValue.trim();
    const update: ProfileUpdate = {};
    update[field] = value;
    setIsSaving(true);
    setModalError('');
    try {
      await profileService.updateProfile(token, update);
      setProfile(previous =>
        previous ? { ...previous, [field]: value } : { [field]: value },
      );
      if (field === 'avatar') {
        setAvatarFailed(false);
      }
      closeEditor();
    } catch (error) {
      setModalError(
        error instanceof Error
          ? error.message
          : 'Unable to update your profile. Please try again.',
      );
      clearConfirmation();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F5EF" />
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to dashboard"
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <MaterialDesignIcons name="arrow-left" size={22} color="#173F32" />
        </Pressable>
        <Text style={styles.headerTitle}>Your profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {profileError ? (
          <View style={styles.errorBanner}>
            <MaterialDesignIcons
              name="alert-circle-outline"
              size={19}
              color="#A33D32"
            />
            <Text style={styles.errorText}>{profileError}</Text>
          </View>
        ) : null}

        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#26734D" />
            <Text style={styles.loadingText}>Loading your profile…</Text>
          </View>
        ) : profile ? (
          <>
            <View style={styles.heroCard}>
              <View style={styles.heroTopRow}>
                <View style={styles.avatarFrame}>
                  {avatar && !avatarFailed ? (
                    <Image
                      source={{ uri: avatar }}
                      style={styles.avatar}
                      onError={() => setAvatarFailed(true)}
                    />
                  ) : (
                    <View style={styles.avatarFallback}>
                      <Text style={styles.avatarInitials}>
                        {getInitials(name)}
                      </Text>
                    </View>
                  )}
                  <View style={styles.avatarBadge}>
                    <MaterialDesignIcons
                      name="leaf"
                      size={13}
                      color="#FFFFFF"
                    />
                  </View>
                </View>
                <Pressable
                  accessibilityRole="button"
                  onPress={openEditor}
                  style={styles.editButton}
                >
                  <MaterialDesignIcons
                    name="pencil-outline"
                    size={16}
                    color="#26734D"
                  />
                  <Text style={styles.editButtonText}>Edit details</Text>
                </Pressable>
              </View>
              <Text style={styles.name}>{name || 'Food rescue member'}</Text>
              <Text style={styles.email}>{email || 'Email not provided'}</Text>
              <View style={styles.memberRow}>
                <MaterialDesignIcons
                  name="calendar-blank-outline"
                  size={15}
                  color="#899187"
                />
                <Text style={styles.memberText}>{joinedDate}</Text>
                {role ? (
                  <View style={styles.rolePill}>
                    <Text style={styles.roleText}>{role}</Text>
                  </View>
                ) : null}
              </View>
            </View>

            <View style={styles.sectionHeading}>
              <View>
                <Text style={styles.eyebrow}>YOUR CONTRIBUTION</Text>
                <Text style={styles.sectionTitle}>Food rescued together</Text>
              </View>
              <MaterialDesignIcons
                name="sprout-outline"
                size={24}
                color="#26734D"
              />
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <View style={[styles.statIcon, styles.greenTint]}>
                  <MaterialDesignIcons
                    name="food-apple-outline"
                    size={19}
                    color="#26734D"
                  />
                </View>
                <Text style={styles.statValue}>
                  {donationError ? '—' : donations.length}
                </Text>
                <Text style={styles.statLabel}>Total donations</Text>
              </View>
              <View style={styles.statCard}>
                <View style={[styles.statIcon, styles.goldTint]}>
                  <MaterialDesignIcons
                    name="heart-outline"
                    size={19}
                    color="#8C6819"
                  />
                </View>
                <Text style={styles.statValue}>
                  {donationError ? '—' : activeDonations}
                </Text>
                <Text style={styles.statLabel}>Active listings</Text>
              </View>
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.detailsTitleRow}>
                <View style={styles.detailsTitleIcon}>
                  <MaterialDesignIcons
                    name="account-circle-outline"
                    size={19}
                    color="#26734D"
                  />
                </View>
                <View>
                  <Text style={styles.detailsTitle}>Account details</Text>
                  <Text style={styles.detailsSubtitle}>
                    Keep your contact information up to date.
                  </Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <MaterialDesignIcons
                  name="account-outline"
                  size={18}
                  color="#899187"
                />
                <View style={styles.detailCopy}>
                  <Text style={styles.detailLabel}>Name</Text>
                  <Text style={styles.detailValue}>
                    {name || 'Not provided'}
                  </Text>
                </View>
                <MaterialDesignIcons
                  name="chevron-right"
                  size={20}
                  color="#B0B5AC"
                />
              </View>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <MaterialDesignIcons
                  name="email-outline"
                  size={18}
                  color="#899187"
                />
                <View style={styles.detailCopy}>
                  <Text style={styles.detailLabel}>Email</Text>
                  <Text style={styles.detailValue}>
                    {email || 'Not provided'}
                  </Text>
                </View>
                <MaterialDesignIcons
                  name="chevron-right"
                  size={20}
                  color="#B0B5AC"
                />
              </View>
            </View>

            <View style={styles.historyCard}>
              <View style={styles.historyTitleRow}>
                <View>
                  <Text style={styles.eyebrow}>YOUR ACTIVITY</Text>
                  <Text style={styles.sectionTitle}>Recent donations</Text>
                </View>
                <MaterialDesignIcons
                  name="food-outline"
                  size={22}
                  color="#26734D"
                />
              </View>
              {donationError ? (
                <Text style={styles.mutedMessage}>{donationError}</Text>
              ) : donations.length > 0 ? (
                donations.slice(0, 3).map((donation, index) => (
                  <View
                    key={
                      getString(donation, ['_id', 'id', 'donationId']) ||
                      `donation-${index}`
                    }
                    style={styles.donationRow}
                  >
                    <View style={styles.donationIcon}>
                      <MaterialDesignIcons
                        name="food-variant"
                        size={18}
                        color="#26734D"
                      />
                    </View>
                    <View style={styles.donationCopy}>
                      <Text style={styles.donationName} numberOfLines={1}>
                        {getString(donation, [
                          'itemName',
                          'foodName',
                          'title',
                        ]) || 'Food donation'}
                      </Text>
                      <Text style={styles.donationStatus}>
                        {getDonationStatus(donation)}
                      </Text>
                    </View>
                    <MaterialDesignIcons
                      name="chevron-right"
                      size={20}
                      color="#B0B5AC"
                    />
                  </View>
                ))
              ) : (
                <Text style={styles.mutedMessage}>
                  {donations.length === 0
                    ? 'Your donation activity will appear here.'
                    : ''}
                </Text>
              )}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.navigate('UserDonation')}
              style={styles.postButton}
            >
              <MaterialDesignIcons name="plus" size={20} color="#FFFFFF" />
              <Text style={styles.postButtonText}>
                Share food with your community
              </Text>
            </Pressable>
          </>
        ) : null}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={isEditOpen}
        onRequestClose={closeEditor}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalBackdrop}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleGroup}>
                <Text style={styles.modalEyebrow}>PROFILE SETTINGS</Text>
                <Text style={styles.modalTitle}>Update your details</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close profile editor"
                onPress={closeEditor}
                style={styles.closeButton}
              >
                <MaterialDesignIcons name="close" size={21} color="#59665B" />
              </Pressable>
            </View>
            <Text style={styles.modalDescription}>
              Make one change at a time. Re-enter the new value to verify it
              before confirming.
            </Text>

            <Text style={styles.inputLabel}>DETAIL TO UPDATE</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setIsFieldPickerOpen(open => !open)}
              style={styles.fieldSelect}
            >
              <MaterialDesignIcons
                name={
                  PROFILE_FIELDS.find(option => option.key === field)?.icon ??
                  'pencil'
                }
                size={19}
                color="#26734D"
              />
              <Text style={styles.fieldSelectText}>
                {PROFILE_FIELDS.find(option => option.key === field)?.label}
              </Text>
              <MaterialDesignIcons
                name={isFieldPickerOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#899187"
              />
            </Pressable>
            {isFieldPickerOpen ? (
              <View style={styles.fieldOptions}>
                {PROFILE_FIELDS.map(option => (
                  <Pressable
                    key={option.key}
                    accessibilityRole="button"
                    onPress={() => selectField(option.key)}
                    style={[
                      styles.fieldOption,
                      field === option.key && styles.selectedFieldOption,
                    ]}
                  >
                    <MaterialDesignIcons
                      name={option.icon}
                      size={18}
                      color={field === option.key ? '#26734D' : '#899187'}
                    />
                    <Text
                      style={[
                        styles.fieldOptionText,
                        field === option.key && styles.selectedFieldOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}

            <Text style={styles.inputLabel}>
              {field === 'avatar'
                ? 'NEW IMAGE URL'
                : `NEW ${field.toUpperCase()}`}
            </Text>
            <TextInput
              accessibilityLabel={`New ${field}`}
              autoCapitalize={field === 'name' ? 'words' : 'none'}
              autoCorrect={field === 'name'}
              keyboardType={field === 'email' ? 'email-address' : 'default'}
              onChangeText={value => {
                setNewValue(value);
                clearConfirmation();
              }}
              placeholder={
                field === 'avatar'
                  ? 'https://example.com/photo.jpg'
                  : `Enter your new ${field}`
              }
              placeholderTextColor="#A1A69C"
              style={styles.textInput}
              value={newValue}
            />
            <Text style={styles.inputLabel}>RE-ENTER TO VERIFY</Text>
            <TextInput
              accessibilityLabel={`Re-enter new ${field}`}
              autoCapitalize={field === 'name' ? 'words' : 'none'}
              autoCorrect={false}
              keyboardType={field === 'email' ? 'email-address' : 'default'}
              onChangeText={value => {
                setVerifiedValue(value);
                clearConfirmation();
              }}
              placeholder={`Re-enter your new ${field}`}
              placeholderTextColor="#A1A69C"
              style={styles.textInput}
              value={verifiedValue}
            />
            {verifiedValue.length > 0 &&
            newValue.trim().toLowerCase() !==
              verifiedValue.trim().toLowerCase() ? (
              <Text style={styles.validationError}>
                The values do not match.
              </Text>
            ) : null}
            {newValue.length > 0 && !isValidValue(field, newValue) ? (
              <Text style={styles.validationError}>
                {field === 'email'
                  ? 'Enter a valid email address.'
                  : field === 'avatar'
                  ? 'Enter a valid http or https image URL.'
                  : 'Name must be at least 2 characters.'}
              </Text>
            ) : null}
            {cooldownStarted ? (
              <View style={styles.cooldownNotice}>
                <MaterialDesignIcons
                  name="shield-check-outline"
                  size={18}
                  color="#8C6819"
                />
                <Text style={styles.cooldownText}>
                  {cooldownSeconds > 0
                    ? `Review your change. You can confirm in ${cooldownSeconds} second${
                        cooldownSeconds === 1 ? '' : 's'
                      }.`
                    : 'Ready when you are. Confirm once more to save this change.'}
                </Text>
              </View>
            ) : null}
            {modalError ? (
              <Text style={styles.validationError}>{modalError}</Text>
            ) : null}

            <View style={styles.modalActions}>
              <Pressable
                accessibilityRole="button"
                onPress={closeEditor}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                disabled={!canConfirm || isSaving || cooldownSeconds > 0}
                onPress={() => confirmChange()}
                style={[
                  styles.confirmButton,
                  (!canConfirm || isSaving || cooldownSeconds > 0) &&
                    styles.disabledButton,
                ]}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <MaterialDesignIcons
                      name={cooldownStarted ? 'check' : 'lock-check-outline'}
                      size={17}
                      color="#FFFFFF"
                    />
                    <Text style={styles.confirmButtonText}>
                      {cooldownSeconds > 0
                        ? `Wait ${cooldownSeconds}s`
                        : cooldownStarted
                        ? 'Confirm & save'
                        : 'Review & confirm'}
                    </Text>
                  </>
                )}
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
