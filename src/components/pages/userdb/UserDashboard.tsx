import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../tanstack/auth/AuthContext';
import { getAccountRole } from '../../../tanstack/services/authServices';
import { donationService } from '../../../tanstack/services/donationServices';
import { profileService } from '../../../tanstack/services/profileServices';
import { RootStackParamList } from '../../../navigation/types';

type Navigation = NativeStackNavigationProp<
  RootStackParamList,
  'UserDashboard'
>;
type RecordValue = Record<string, unknown>;

type DashboardData = {
  profile: RecordValue;
  donations: RecordValue[];
};

const EMPTY_DONATIONS: RecordValue[] = [];

const isRecord = (value: unknown): value is RecordValue =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function getRecords(value: unknown): RecordValue[] {
  const records: RecordValue[] = [];
  const queue: unknown[] = [value];
  const visited = new Set<object>();

  while (queue.length) {
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

function getProfileRecord(profile: unknown): RecordValue {
  const records = getRecords(profile);
  return (
    records.find(record => {
      const name = record.name ?? record.fullName;
      return typeof name === 'string';
    }) ??
    records[0] ??
    {}
  );
}

function findString(
  records: RecordValue[],
  fields: string[],
): string | undefined {
  for (const record of records) {
    for (const field of fields) {
      const value = Object.entries(record).find(
        ([key]) => key.toLowerCase() === field.toLowerCase(),
      )?.[1];
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }
  }
  return undefined;
}

function getDonorId(profile: unknown): string | undefined {
  const records = getRecords(profile);
  for (const record of records) {
    for (const field of ['_id', 'id', 'userId', 'donorId']) {
      const value = Object.entries(record).find(
        ([key]) => key.toLowerCase() === field.toLowerCase(),
      )?.[1];
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
      if (typeof value === 'number') {
        return String(value);
      }
    }
  }
  return undefined;
}

function getDonations(value: unknown): RecordValue[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord);
  }
  if (!isRecord(value)) {
    return [];
  }

  for (const key of ['donations', 'items', 'results', 'history']) {
    const list = value[key];
    if (Array.isArray(list)) {
      return list.filter(isRecord);
    }
  }
  if (Array.isArray(value.data)) {
    return value.data.filter(isRecord);
  }
  if (isRecord(value.data)) {
    return getDonations(value.data);
  }
  return [];
}

function getDonationStatus(donation: RecordValue): string {
  const status = findString([donation], ['status', 'donationStatus']);
  return status ?? 'Posted';
}

function isActiveDonation(donation: RecordValue): boolean {
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
}

function formatQuantity(donation: RecordValue): string | undefined {
  const quantity = donation.quantity;
  if (typeof quantity === 'number' && Number.isFinite(quantity)) {
    const unit =
      typeof donation.unit === 'string' && donation.unit.trim()
        ? ` ${donation.unit.trim()}`
        : '';
    return `${quantity}${unit}`;
  }
  if (typeof quantity === 'string' && quantity.trim()) {
    return quantity.trim();
  }
  return undefined;
}

function getDonationTitle(donation: RecordValue): string {
  return (
    findString([donation], ['itemName', 'foodName', 'title', 'foodType']) ??
    'Food donation'
  );
}

function getDonationIdentifier(donation: RecordValue, index: number): string {
  return (
    findString([donation], ['_id', 'id', 'donationId', 'batchId']) ??
    `donation-${index}`
  );
}

function getProfileName(profile: RecordValue): string {
  return (
    findString([profile], ['name', 'fullName', 'organizationName']) ?? 'Donor'
  );
}

function MetricCard({
  label,
  value,
  caption,
  icon,
  tint,
  color,
}: {
  label: string;
  value: string;
  caption: string;
  icon: React.ComponentProps<typeof MaterialDesignIcons>['name'];
  tint: string;
  color: string;
}) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricTop}>
        <Text style={styles.metricLabel}>{label}</Text>
        <View style={[styles.metricIcon, { backgroundColor: tint }]}>
          <MaterialDesignIcons name={icon} size={17} color={color} />
        </View>
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      <Text style={styles.metricCaption}>{caption}</Text>
    </View>
  );
}

function DonationCard({
  donation,
  index,
}: {
  donation: RecordValue;
  index: number;
}) {
  const status = getDonationStatus(donation);
  const isComplete = ['delivered', 'complete', 'completed'].includes(
    status.toLowerCase(),
  );
  const isWaiting = ['pending', 'posted', 'awaiting pickup'].includes(
    status.toLowerCase(),
  );
  const progress = isComplete ? 1 : isWaiting ? 0.28 : 0.72;
  const tint = isWaiting ? '#F6E7B8' : '#E2EDDF';
  const color = isWaiting ? '#8C6819' : '#26734D';

  return (
    <View
      style={[
        styles.donationCard,
        isWaiting ? styles.waitingDonationCard : styles.activeDonationCard,
      ]}
    >
      <View style={styles.donationTop}>
        <View style={[styles.donationIcon, { backgroundColor: tint }]}>
          <MaterialDesignIcons name="food-outline" size={18} color={color} />
        </View>
        <View style={styles.donationSummary}>
          <Text style={styles.donationTitle} numberOfLines={1}>
            {getDonationTitle(donation)}
          </Text>
          <Text style={styles.donationSubtext}>
            {findString([donation], ['batchNumber', 'batchId', '_id']) ??
              `Donation #${index + 1}`}
            {formatQuantity(donation) ? ` · ${formatQuantity(donation)}` : ''}
          </Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: tint }]}>
          <Text style={[styles.statusText, { color }]} numberOfLines={1}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
      <View style={styles.progressLabels}>
        <Text
          style={[
            styles.progressLabel,
            progress >= 0.28 && styles.progressActive,
          ]}
        >
          Posted
        </Text>
        <Text
          style={[
            styles.progressLabel,
            progress >= 0.72 && styles.progressActive,
          ]}
        >
          Matched
        </Text>
        <Text
          style={[styles.progressLabel, progress >= 1 && styles.progressActive]}
        >
          Delivered
        </Text>
      </View>
      <View style={styles.donationFooter}>
        <Text style={styles.donationSubtext} numberOfLines={1}>
          {findString([donation], ['pickupLocation', 'location']) ??
            'Donation tracking'}
        </Text>
        <Text style={[styles.expiryText, { color }]}>
          {findString([donation], ['expiry', 'expiryWindow']) ?? ''}
        </Text>
      </View>
    </View>
  );
}

function SideNavigation({
  compact,
  onDonate,
  onProfile,
  onHome,
}: {
  compact: boolean;
  onDonate: () => void;
  onProfile: () => void;
  onHome: () => void;
}) {
  return (
    <View style={[styles.sidebar, compact && styles.compactSidebar]}>
      {!compact ? (
        <View style={styles.workspace}>
          <View style={styles.workspaceIcon}>
            <MaterialDesignIcons name="heart-pulse" size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.workspaceTitle}>Donor Workspace</Text>
            <Text style={styles.workspaceSubtitle}>Share surplus food</Text>
          </View>
        </View>
      ) : null}
      <Pressable
        style={({ pressed }) => [
          styles.sideItem,
          compact && styles.compactSideItem,
          styles.sideItemActive,
          pressed && styles.pressed,
        ]}
        onPress={onHome}
      >
        <MaterialDesignIcons
          name="view-dashboard-outline"
          size={17}
          color="#FFFFFF"
        />
        <Text
          style={[
            styles.sideItemActiveText,
            compact && styles.compactSideItemText,
          ]}
        >
          Overview
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.sideItem,
          compact && styles.compactSideItem,
          pressed && styles.pressed,
        ]}
        onPress={onDonate}
      >
        <MaterialDesignIcons
          name="view-list-outline"
          size={17}
          color="#C6E2C5"
        />
        <Text
          style={[styles.sideItemText, compact && styles.compactSideItemText]}
        >
          Donations
        </Text>
      </Pressable>
      {!compact ? (
        <>
          <View style={styles.sidebarSpacer} />
          <Pressable
            style={({ pressed }) => [
              styles.newDonationButton,
              pressed && styles.pressed,
            ]}
            onPress={onDonate}
          >
            <MaterialDesignIcons name="plus" size={19} color="#FFFFFF" />
            <Text style={styles.newDonationText}>New Donation</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.sideItem,
              pressed && styles.pressed,
            ]}
            onPress={onProfile}
          >
            <MaterialDesignIcons
              name="account-outline"
              size={17}
              color="#C6E2C5"
            />
            <Text style={styles.sideItemText}>Profile</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}

export default function UserDashboard() {
  const navigation = useNavigation<Navigation>();
  const { token } = useAuth();
  const { width } = useWindowDimensions();
  const wide = width >= 850;
  const narrow = width < 520;
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadDashboard = useCallback(async () => {
    if (!token) {
      setDashboard(null);
      setErrorMessage('Sign in to view your donor dashboard.');
      setLoading(false);
      setRefreshing(false);
      return;
    }

    setErrorMessage('');
    try {
      const profileResponse = await profileService.getProfile(token);
      const profile = getProfileRecord(profileResponse);
      const donorId = getDonorId(profileResponse);
      if (!donorId) {
        throw new Error(
          'Your profile did not include a donor ID, so donation history cannot be loaded.',
        );
      }
      const donationResponse = await donationService.getDonationsByDonor(
        token,
        donorId,
      );
      setDashboard({
        profile,
        donations: getDonations(donationResponse),
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to load your dashboard. Please try again.',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadDashboard().then(() => undefined);
    }, [loadDashboard]),
  );

  const donations = dashboard?.donations ?? EMPTY_DONATIONS;
  const activeDonations = useMemo(
    () => donations.filter(isActiveDonation),
    [donations],
  );
  const donorRole = getAccountRole(dashboard?.profile);
  const profileName = dashboard ? getProfileName(dashboard.profile) : 'Donor';
  const profileRecords = dashboard ? [dashboard.profile] : [];
  const mealsShared = findString(profileRecords, [
    'mealsShared',
    'totalMeals',
    'mealsDonated',
  ]);
  const sheltersSupported = findString(profileRecords, [
    'sheltersSupported',
    'totalShelters',
  ]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboard().then(() => undefined);
  };

  const openDonations = () => navigation.navigate('UserDonation');
  const openProfile = () => navigation.navigate('UserProfile');
  const openHome = () => navigation.navigate('Home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F5EF" />
      <View style={styles.appLayout}>
        {wide ? (
          <SideNavigation
            compact={false}
            onDonate={openDonations}
            onProfile={openProfile}
            onHome={openHome}
          />
        ) : null}
        <View style={styles.main}>
          <View style={styles.topBar}>
            {!wide ? (
              <Pressable
                style={styles.mobileMenu}
                onPress={openHome}
                accessibilityRole="button"
                accessibilityLabel="Go to home"
              >
                <MaterialDesignIcons
                  name="arrow-left"
                  size={22}
                  color="#1C2C25"
                />
              </Pressable>
            ) : null}
            <View style={styles.brandGroup}>
              <View style={styles.brandMark}>
                <MaterialDesignIcons
                  name="heart-pulse"
                  size={18}
                  color="#26734D"
                />
              </View>
              <View>
                <Text style={styles.brand}>Vitality Logistics</Text>
                <Text style={styles.brandCaption}>FOOD RESCUE NETWORK</Text>
              </View>
            </View>
            <View style={styles.topBarActions}>
              {!narrow ? (
                <View style={styles.searchPlaceholder}>
                  <MaterialDesignIcons
                    name="magnify"
                    size={17}
                    color="#899187"
                  />
                  <Text style={styles.searchText}>Search donations...</Text>
                </View>
              ) : null}
              <Pressable style={styles.notificationButton}>
                <MaterialDesignIcons
                  name="bell-outline"
                  size={20}
                  color="#899187"
                />
              </Pressable>
              <Pressable
                style={styles.avatar}
                onPress={openProfile}
                accessibilityRole="button"
                accessibilityLabel="Open profile"
              >
                <Text style={styles.avatarText}>
                  {profileName.charAt(0).toUpperCase()}
                </Text>
              </Pressable>
            </View>
          </View>

          {!wide ? (
            <SideNavigation
              compact
              onDonate={openDonations}
              onProfile={openProfile}
              onHome={openHome}
            />
          ) : null}

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            {loading ? (
              <View style={styles.loadingState}>
                <ActivityIndicator size="large" color="#26734D" />
                <Text style={styles.loadingText}>
                  Connecting to your dashboard...
                </Text>
                <Text style={styles.loadingHint}>
                  The service may take a moment to wake up.
                </Text>
              </View>
            ) : errorMessage ? (
              <View style={styles.errorCard}>
                <MaterialDesignIcons
                  name="cloud-alert-outline"
                  size={28}
                  color="#C24136"
                />
                <Text style={styles.errorTitle}>Dashboard unavailable</Text>
                <Text style={styles.errorDescription}>{errorMessage}</Text>
                <Pressable
                  style={styles.retryButton}
                  onPress={() => {
                    setLoading(true);
                    loadDashboard().then(() => undefined);
                  }}
                >
                  <Text style={styles.retryText}>Try again</Text>
                </Pressable>
              </View>
            ) : dashboard ? (
              <>
                <View
                  style={[
                    styles.dashboardHero,
                    narrow && styles.narrowDashboardHero,
                  ]}
                >
                  <View style={styles.dashboardHeroCopy}>
                    <View style={styles.dashboardEyebrow}>
                      <View style={styles.dashboardEyebrowDot} />
                      <Text style={styles.dashboardEyebrowText}>
                        YOUR FOOD RESCUE HUB
                      </Text>
                    </View>
                    <Text style={styles.dashboardHeroTitle} numberOfLines={1}>
                      Good to see you, {profileName.split(' ')[0]}.
                    </Text>
                    <Text style={styles.dashboardHeroDescription}>
                      Every share helps good food find its next table.
                    </Text>
                  </View>
                  {donorRole === 'donor' ? (
                    <Pressable
                      style={({ pressed }) => [
                        styles.dashboardHeroButton,
                        pressed && styles.pressedButton,
                      ]}
                      onPress={openDonations}
                    >
                      <Text style={styles.dashboardHeroButtonText}>
                        Share food
                      </Text>
                      <MaterialDesignIcons
                        name="arrow-right"
                        size={17}
                        color="#173F32"
                      />
                    </Pressable>
                  ) : null}
                </View>
                <View style={styles.metricsRow}>
                  <MetricCard
                    label="Active Donations"
                    value={String(activeDonations.length)}
                    caption={
                      activeDonations.length === 1
                        ? '1 donation in progress'
                        : `${activeDonations.length} donations in progress`
                    }
                    icon="truck-fast-outline"
                    tint="#E2EDDF"
                    color="#26734D"
                  />
                  <MetricCard
                    label="Meals Shared"
                    value={mealsShared ?? '—'}
                    caption={
                      mealsShared ? 'Lifetime impact' : 'Not provided by API'
                    }
                    icon="food"
                    tint="#F6E7B8"
                    color="#8C6819"
                  />
                  <MetricCard
                    label="Shelters Supported"
                    value={sheltersSupported ?? '—'}
                    caption={
                      sheltersSupported
                        ? 'Across your community'
                        : 'Not provided by API'
                    }
                    icon="domain"
                    tint="#FCE9D6"
                    color="#B65C20"
                  />
                </View>

                <View
                  style={[
                    styles.dashboardColumns,
                    !wide && styles.stackedColumns,
                  ]}
                >
                  <View style={[styles.leftColumn, !wide && styles.fullColumn]}>
                    {donorRole !== 'donor' ? (
                      <View style={styles.roleCard}>
                        <Text style={styles.roleTitle}>
                          {donorRole === 'volunteer'
                            ? 'Volunteer account'
                            : 'Account type unavailable'}
                        </Text>
                        <Text style={styles.roleDescription}>
                          {donorRole === 'volunteer'
                            ? 'Your account is set up as a volunteer. Donation creation is available to donor accounts.'
                            : 'We could not confirm your account type. Donation creation is unavailable until your donor profile is confirmed.'}
                        </Text>
                      </View>
                    ) : null}

                    <View style={styles.insightsCard}>
                      <Text style={styles.insightsTitle}>Quick Insights</Text>
                      <View style={styles.insightRow}>
                        <View style={styles.insightLabel}>
                          <MaterialDesignIcons
                            name="recycle"
                            size={17}
                            color="#26734D"
                          />
                          <Text style={styles.insightText}>
                            Total donations
                          </Text>
                        </View>
                        <Text style={styles.insightValue}>
                          {donations.length}
                        </Text>
                      </View>
                      <View style={styles.insightRow}>
                        <View style={styles.insightLabel}>
                          <MaterialDesignIcons
                            name="food-apple-outline"
                            size={17}
                            color="#B65C20"
                          />
                          <Text style={styles.insightText}>Most recent</Text>
                        </View>
                        <Text style={styles.insightValue} numberOfLines={1}>
                          {donations.length
                            ? getDonationTitle(donations[0])
                            : '—'}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[styles.historyColumn, !wide && styles.fullColumn]}
                  >
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>Your Donations</Text>
                      <Pressable onPress={openDonations}>
                        <Text style={styles.viewAll}>New donation</Text>
                      </Pressable>
                    </View>
                    {donations.length ? (
                      donations
                        .slice(0, 6)
                        .map((donation, index) => (
                          <DonationCard
                            key={getDonationIdentifier(donation, index)}
                            donation={donation}
                            index={index}
                          />
                        ))
                    ) : (
                      <View style={styles.emptyCard}>
                        <MaterialDesignIcons
                          name="package-variant"
                          size={30}
                          color="#899187"
                        />
                        <Text style={styles.emptyTitle}>No donations yet</Text>
                        <Text style={styles.emptyDescription}>
                          Your donation history and active tracking will appear
                          here.
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </>
            ) : null}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F5EF',
  },
  appLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 214,
    paddingHorizontal: 14,
    paddingTop: 24,
    paddingBottom: 18,
    backgroundColor: '#173F32',
  },
  compactSidebar: {
    width: '100%',
    minHeight: 54,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  compactSideItem: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 40,
    paddingHorizontal: 8,
    gap: 7,
    marginBottom: 0,
  },
  compactSideItemText: {
    fontSize: 12,
  },
  workspace: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    marginBottom: 37,
    paddingHorizontal: 7,
  },
  workspaceIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#26734D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workspaceTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  workspaceSubtitle: {
    color: '#C6E2C5',
    fontSize: 10,
    marginTop: 3,
  },
  sideItem: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingHorizontal: 11,
    borderRadius: 9,
    marginBottom: 5,
  },
  sideItemActive: {
    backgroundColor: '#26734D',
  },
  sideItemText: {
    color: '#C6E2C5',
    fontSize: 13,
    fontWeight: '500',
  },
  sideItemActiveText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  sidebarSpacer: {
    flex: 1,
    minHeight: 16,
  },
  newDonationButton: {
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 10,
    backgroundColor: '#26734D',
    marginBottom: 14,
  },
  newDonationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
  main: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#F7F5EF',
  },
  topBar: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    backgroundColor: '#FFFEFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E5DC',
  },
  mobileMenu: {
    marginRight: 12,
    padding: 3,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: '#E2EDDF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: '#1C2C25',
    fontSize: 15,
    fontWeight: '800',
  },
  brandCaption: {
    color: '#26734D',
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  topBarActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  searchPlaceholder: {
    width: 190,
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderRadius: 9,
    paddingHorizontal: 10,
    backgroundColor: '#F1EFE8',
  },
  searchText: {
    color: '#899187',
    fontSize: 12,
  },
  notificationButton: {
    padding: 4,
  },
  avatar: {
    width: 33,
    height: 33,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B65C20',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    width: '100%',
    maxWidth: 1320,
    alignSelf: 'center',
    padding: 22,
    paddingBottom: 36,
    gap: 16,
  },
  loadingState: {
    minHeight: 320,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  },
  loadingText: {
    color: '#35443A',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 14,
  },
  loadingHint: {
    color: '#69766E',
    fontSize: 13,
    marginTop: 6,
  },
  errorCard: {
    maxWidth: 520,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 25,
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#E9C9BF',
    borderRadius: 19,
    backgroundColor: '#FFFEFB',
  },
  errorTitle: {
    color: '#1C2C25',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 12,
  },
  errorDescription: {
    color: '#69766E',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 7,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#26734D',
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 4,
  },
  dashboardHero: {
    minHeight: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: 22,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#173F32',
  },
  narrowDashboardHero: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  dashboardHeroCopy: {
    flex: 1,
  },
  dashboardEyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 10,
  },
  dashboardEyebrowDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E8C968',
  },
  dashboardEyebrowText: {
    color: '#C6E2C5',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  dashboardHeroTitle: {
    color: '#FFFEFB',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  dashboardHeroDescription: {
    color: '#D5E4D9',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  dashboardHeroButton: {
    minHeight: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 13,
    borderRadius: 14,
    backgroundColor: '#E8C968',
  },
  dashboardHeroButtonText: {
    color: '#173F32',
    fontSize: 12,
    fontWeight: '800',
  },
  metricCard: {
    flex: 1,
    minWidth: 150,
    minHeight: 125,
    padding: 17,
    borderWidth: 1,
    borderColor: '#E8E5DC',
    borderRadius: 18,
    backgroundColor: '#FFFEFB',
    elevation: 2,
    shadowColor: '#1C2C25',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  metricTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricLabel: {
    color: '#69766E',
    fontSize: 12,
  },
  metricIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  metricValue: {
    fontSize: 27,
    fontWeight: '800',
    marginTop: 10,
  },
  metricCaption: {
    color: '#899187',
    fontSize: 10,
    marginTop: 3,
  },
  dashboardColumns: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  stackedColumns: {
    flexDirection: 'column',
  },
  leftColumn: {
    width: '32%',
    gap: 13,
  },
  historyColumn: {
    flex: 1,
    minWidth: 0,
  },
  fullColumn: {
    width: '100%',
  },
  pressedButton: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  roleCard: {
    minHeight: 150,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#E9EEE2',
  },
  roleTitle: {
    color: '#1C2C25',
    fontSize: 17,
    fontWeight: '700',
  },
  roleDescription: {
    color: '#526057',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 9,
  },
  insightsCard: {
    padding: 17,
    borderWidth: 1,
    borderColor: '#E8E5DC',
    borderRadius: 18,
    backgroundColor: '#FFFEFB',
    elevation: 2,
    shadowColor: '#1C2C25',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  insightsTitle: {
    color: '#1C2C25',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 13,
  },
  insightRow: {
    minHeight: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  insightLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightText: {
    color: '#69766E',
    fontSize: 12,
  },
  insightValue: {
    maxWidth: '50%',
    color: '#1C2C25',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    minHeight: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 9,
  },
  sectionTitle: {
    color: '#1C2C25',
    fontSize: 15,
    fontWeight: '700',
  },
  viewAll: {
    color: '#26734D',
    fontSize: 12,
    fontWeight: '600',
  },
  donationCard: {
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: '#FFFEFB',
    elevation: 2,
    shadowColor: '#1C2C25',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  donationTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  donationIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
  donationSummary: {
    flex: 1,
    minWidth: 0,
  },
  donationTitle: {
    color: '#1C2C25',
    fontSize: 13,
    fontWeight: '700',
  },
  donationSubtext: {
    color: '#899187',
    fontSize: 10,
    marginTop: 3,
  },
  statusPill: {
    maxWidth: 150,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  progressTrack: {
    height: 5,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#E8E5DC',
    marginTop: 14,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  progressLabel: {
    color: '#899187',
    fontSize: 9,
  },
  progressActive: {
    color: '#35443A',
  },
  donationFooter: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#E8E5DC',
    marginTop: 11,
    paddingTop: 8,
  },
  expiryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: '#FFFEFB',
    elevation: 1,
    shadowColor: '#1C2C25',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  waitingDonationCard: {
    borderColor: '#E8D79C',
  },
  activeDonationCard: {
    borderColor: '#D4E1D2',
  },
  emptyTitle: {
    color: '#35443A',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 10,
  },
  emptyDescription: {
    maxWidth: 300,
    color: '#69766E',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 5,
  },
});
