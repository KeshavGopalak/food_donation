import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { RootStackParamList } from '../../../navigation/types';
import { UserDonationStyles as styles } from '../../../styles/UserDonationStyles';
import { useDonation } from '../../../tanstack/hooks/useDonation';

type FoodType = 'Bakery & Bread' | 'Prepared Food' | 'Produce';
type Navigation = NativeStackNavigationProp<
  RootStackParamList,
  'UserDonation'
>;

export default function UserDonation() {
  const navigation = useNavigation<Navigation>();
  const [foodType, setFoodType] = useState<FoodType>('Bakery & Bread');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryWindow, setExpiryWindow] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [showFoodTypes, setShowFoodTypes] = useState(false);
  const donationMutation = useDonation();

  const handleClearForm = () => {
    setFoodType('Bakery & Bread');
    setItemName('');
    setQuantity('');
    setExpiryWindow('');
    setPickupLocation('');
    setPhotoUrl('');
    setDescription('');
  };

  const handlePostDonation = () => {
    const parsedQuantity = Number(quantity);
    if (
      !itemName.trim() ||
      !expiryWindow.trim() ||
      !pickupLocation.trim() ||
      !Number.isFinite(parsedQuantity) ||
      parsedQuantity <= 0
    ) {
      Alert.alert(
        'Check donation details',
        'Enter the item name, quantity, expiry window, and pickup location.',
      );
      return;
    }

    donationMutation.mutate(
      {
        foodType,
        itemName: itemName.trim(),
        quantity: parsedQuantity,
        expiryWindow: expiryWindow.trim(),
        pickupLocation: pickupLocation.trim(),
        ...(photoUrl.trim() ? { photoUrl: photoUrl.trim() } : {}),
        ...(description.trim() ? { description: description.trim() } : {}),
      },
      {
        onSuccess: () => {
          handleClearForm();
          Alert.alert('Donation posted', 'Your donation was saved.', [
            {
              text: 'View dashboard',
              onPress: () => navigation.goBack(),
            },
          ]);
        },
        onError: error => {
          Alert.alert('Could not post donation', error.message);
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ================= HEADER ================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Back to dashboard"
          >
            <MaterialDesignIcons name="arrow-left" size={20} color="#1C2C25" />
          </TouchableOpacity>

          <View style={styles.headerTitleArea}>
            <Text style={styles.headerTitle}>Share surplus food</Text>

            <View style={styles.headerBadges}>
              <View style={styles.headerBadge}>
                <MaterialDesignIcons
                  name="clock-outline"
                  size={10}
                  color="#B65C20"
                />

                  <Text style={styles.headerBadgeText}>
                    LINKED TO YOUR ACCOUNT
                  </Text>
              </View>

              <View style={styles.wasteTarget}>
                <MaterialDesignIcons name="leaf" size={11} color="#26734D" />

                <Text style={styles.wasteTargetText}>FOOD RESCUE NETWORK</Text>
              </View>
            </View>
          </View>

          <View style={styles.headerProfile}>
            <MaterialDesignIcons name="account" size={16} color="#FFFFFF" />
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* ================= TITLE ================= */}

          <View style={styles.titleSection}>
            <Text style={styles.pageTitle}>Give good food a next stop.</Text>

            <Text style={styles.pageDescription}>
              Add a few details so a nearby organization can make use of your
              surplus.
            </Text>

            <View style={styles.infoBanner}>
              <MaterialDesignIcons
                name="account-group-outline"
                size={13}
                color="#26734D"
              />

              <Text style={styles.infoBannerText}>
                Your donation will be linked to your signed-in account for
                tracking.
              </Text>
            </View>
          </View>

          {/* ================= DONATION FORM ================= */}

          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <View style={styles.formHeaderIcon}>
                <MaterialDesignIcons
                  name="plus-circle-outline"
                  size={17}
                  color="#26734D"
                />
              </View>

              <Text style={styles.formTitle}>Donation details</Text>

              <Text style={styles.requiredText}>* Required</Text>
            </View>

            {/* Food Type */}

            <View style={styles.field}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Food Type
                  <Text style={styles.requiredStar}> *</Text>
                </Text>

                <View style={styles.autoCategorized}>
                  <MaterialDesignIcons
                    name="auto-fix"
                    size={10}
                    color="#26734D"
                  />

                  <Text style={styles.autoCategorizedText}>
                    Auto-categorized
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.foodTypeSelector}
                activeOpacity={0.8}
                onPress={() => setShowFoodTypes(!showFoodTypes)}
              >
                <View style={styles.foodTypeLeft}>
                  <MaterialDesignIcons
                    name={
                      foodType === 'Produce'
                        ? 'food-apple-outline'
                        : foodType === 'Prepared Food'
                        ? 'silverware-fork-knife'
                        : 'bread-slice-outline'
                    }
                    size={14}
                    color="#26734D"
                  />

                  <Text style={styles.foodTypeText}>{foodType}</Text>
                </View>

                <MaterialDesignIcons
                  name={showFoodTypes ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color="#65716E"
                />
              </TouchableOpacity>

              {showFoodTypes && (
                <View style={styles.dropdown}>
                  {(
                    ['Bakery & Bread', 'Prepared Food', 'Produce'] as FoodType[]
                  ).map(type => (
                    <TouchableOpacity
                      key={type}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setFoodType(type);
                        setShowFoodTypes(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{type}</Text>

                      {foodType === type && (
                        <MaterialDesignIcons
                          name="check"
                          size={15}
                          color="#26734D"
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Item Name */}

            <View style={styles.field}>
              <Text style={styles.label}>
                Item Name
                <Text style={styles.requiredStar}> *</Text>
              </Text>

              <View style={styles.textInputContainer}>
                <TextInput
                  value={itemName}
                  onChangeText={setItemName}
                  style={styles.textInput}
                  placeholder="e.g. Fresh bread"
                  placeholderTextColor="#8A9490"
                />

                {itemName.length > 0 && (
                  <TouchableOpacity onPress={() => setItemName('')}>
                    <MaterialDesignIcons
                      name="close-circle-outline"
                      size={16}
                      color="#8A9490"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Quantity */}

            <View style={styles.field}>
              <Text style={styles.label}>
                Quantity
                <Text style={styles.requiredStar}> *</Text>
              </Text>

              <View style={styles.quantityInput}>
                <MaterialDesignIcons name="scale" size={14} color="#63706B" />

                <TextInput
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                  style={styles.quantityTextInput}
                  placeholder="e.g. 18"
                  placeholderTextColor="#899187"
                  accessibilityLabel="Donation quantity"
                />
              </View>

              <Text style={styles.quantityHelper}>
                Add a unit in the description if it helps.
              </Text>
            </View>

            {/* Expiry */}

            <View style={styles.field}>
              <Text style={styles.label}>
                Expiry Window
                <Text style={styles.requiredStar}> *</Text>
              </Text>

              <View style={styles.textInputContainer}>
                <MaterialDesignIcons
                  name="clock-outline"
                  size={16}
                  color="#69766E"
                />
                <TextInput
                  value={expiryWindow}
                  onChangeText={setExpiryWindow}
                  style={styles.textInput}
                  placeholder="e.g. Today by 6 PM"
                  placeholderTextColor="#899187"
                  accessibilityLabel="Expiry window"
                />
              </View>
            </View>

            {/* Pickup Location */}

            <View style={styles.field}>
              <Text style={styles.label}>
                Pickup Location
                <Text style={styles.requiredStar}> *</Text>
              </Text>

              <View style={styles.textInputContainer}>
                <MaterialDesignIcons
                  name="map-marker-outline"
                  size={17}
                  color="#26734D"
                />
                <TextInput
                  value={pickupLocation}
                  onChangeText={setPickupLocation}
                  style={styles.textInput}
                  placeholder="Street address and pickup instructions"
                  placeholderTextColor="#899187"
                  accessibilityLabel="Pickup location"
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.multilineInput}
                placeholder="Add helpful details about the food"
                placeholderTextColor="#899187"
                multiline
                textAlignVertical="top"
                accessibilityLabel="Donation description"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Photo URL (optional)</Text>
              <View style={styles.textInputContainer}>
                <MaterialDesignIcons
                  name="image-outline"
                  size={17}
                  color="#26734D"
                />
                <TextInput
                  value={photoUrl}
                  onChangeText={setPhotoUrl}
                  style={styles.textInput}
                  placeholder="https://..."
                  placeholderTextColor="#899187"
                  autoCapitalize="none"
                  keyboardType="url"
                  accessibilityLabel="Photo URL"
                />
              </View>
            </View>

            {/* Submit */}

            <TouchableOpacity
              style={styles.postDonationButton}
              activeOpacity={0.85}
              disabled={donationMutation.isPending}
              onPress={handlePostDonation}
            >
              <Text style={styles.postDonationText}>
                {donationMutation.isPending ? 'Posting...' : 'Post Donation'}
              </Text>

              <MaterialDesignIcons
                name="arrow-right"
                size={17}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            {/* Clear */}

            <TouchableOpacity
              style={styles.clearButton}
              activeOpacity={0.8}
              onPress={handleClearForm}
            >
              <Text style={styles.clearButtonText}>Clear Form</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.trackingNote}>
            <MaterialDesignIcons
              name="heart-pulse"
              size={21}
              color="#26734D"
            />
            <View style={styles.trackingNoteCopy}>
              <Text style={styles.trackingNoteTitle}>
                Your food stays connected to you.
              </Text>
              <Text style={styles.trackingNoteDescription}>
                After posting, follow your donation and its status from your
                dashboard.
              </Text>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
