import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { UserDonationStyles as styles } from '../../../styles/UserDonationStyles';
import { useDonation } from '../../../tanstack/hooks/useDonation';

type FoodType = 'Bakery & Bread' | 'Prepared Food' | 'Produce';

export default function UserDonation() {
  const [foodType, setFoodType] =
    useState<FoodType>('Bakery & Bread');

  const [itemName, setItemName] = useState(
    'Artisanal Sourdough & Baguettes',
  );

  const [quantity, setQuantity] = useState('18');

  const [expiry, setExpiry] = useState(
    'Today by 8:30 PM',
  );

  const [location, setLocation] = useState(
    'The Green Hearth Bakery',
  );

  const [photoAdded, setPhotoAdded] = useState(false);

  const [showFoodTypes, setShowFoodTypes] =
    useState(false);

  const donationMutation = useDonation();

  const handleClearForm = () => {
    setFoodType('Bakery & Bread');
    setItemName('');
    setQuantity('');
    setExpiry('Today by 8:30 PM');
    setLocation('The Green Hearth Bakery');
    setPhotoAdded(false);
  };

  const handlePostDonation = () => {
    const parsedQuantity = Number(quantity);
    if (
      !itemName.trim() ||
      !Number.isFinite(parsedQuantity) ||
      parsedQuantity <= 0
    ) {
      Alert.alert(
        'Check donation details',
        'Enter an item name and a quantity greater than zero.',
      );
      return;
    }

    donationMutation.mutate(
      {
        foodType,
        itemName: itemName.trim(),
        quantity: parsedQuantity,
        expiry,
        location: location.trim(),
      },
      {
        onSuccess: () => {
          Alert.alert('Donation posted', 'Your donation was sent successfully.');
          handleClearForm();
        },
        onError: error => {
          Alert.alert('Could not post donation', error.message);
        },
      },
    );
  };

  const handlePhotoPress = () => {
    Alert.alert(
      'Add Food Photo',
      'Camera and gallery upload will be connected later.',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <MaterialDesignIcons
            name="arrow-left"
            size={20}
            color="#27322F"
          />
        </TouchableOpacity>

        <View style={styles.headerTitleArea}>
          <Text style={styles.headerTitle}>
            New Donation Intake
          </Text>

          <View style={styles.headerBadges}>
            <View style={styles.headerBadge}>
              <MaterialDesignIcons
                name="clock-outline"
                size={10}
                color="#C76A29"
              />

              <Text style={styles.headerBadgeText}>
                Peak Surplus Hours
              </Text>
            </View>

            <View style={styles.wasteTarget}>
              <MaterialDesignIcons
                name="leaf"
                size={11}
                color="#00805A"
              />

              <Text style={styles.wasteTargetText}>
                Zero Waste Target
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.headerProfile}>
          <MaterialDesignIcons
            name="account"
            size={16}
            color="#FFFFFF"
            
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================= TITLE ================= */}

        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>
            Post Surplus Food
          </Text>

          <Text style={styles.pageDescription}>
            Convert your excess inventory into community
            <Text style={styles.boldText}>
              {' '}
              impact within seconds.
            </Text>
          </Text>

          <View style={styles.infoBanner}>
            <MaterialDesignIcons
              name="account-group-outline"
              size={13}
              color="#00805A"
            />

            <Text style={styles.infoBannerText}>
              3 shelters nearby are actively requesting
              {'\n'}
              bakery items.
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
                color="#00805A"
              />
            </View>

            <Text style={styles.formTitle}>
              Add New Donation
            </Text>

            <Text style={styles.requiredText}>
              * Required
            </Text>
          </View>

          {/* Food Type */}

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>
                Food Type
                <Text style={styles.requiredStar}>
                  {' '}
                  *
                </Text>
              </Text>

              <View style={styles.autoCategorized}>
                <MaterialDesignIcons
                  name="auto-fix"
                  size={10}
                  color="#00805A"
                />

                <Text style={styles.autoCategorizedText}>
                  Auto-categorized
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.foodTypeSelector}
              activeOpacity={0.8}
              onPress={() =>
                setShowFoodTypes(!showFoodTypes)
              }
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
                  color="#00805A"
                />

                <Text style={styles.foodTypeText}>
                  {foodType}
                </Text>
              </View>

              <MaterialDesignIcons
                name={
                  showFoodTypes
                    ? 'chevron-up'
                    : 'chevron-down'
                }
                size={16}
                color="#65716E"
              />
            </TouchableOpacity>

            {showFoodTypes && (
              <View style={styles.dropdown}>
                {(
                  [
                    'Bakery & Bread',
                    'Prepared Food',
                    'Produce',
                  ] as FoodType[]
                ).map(type => (
                  <TouchableOpacity
                    key={type}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setFoodType(type);
                      setShowFoodTypes(false);
                    }}
                  >
                    <Text style={styles.dropdownText}>
                      {type}
                    </Text>

                    {foodType === type && (
                      <MaterialDesignIcons
                        name="check"
                        size={15}
                        color="#00805A"
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
              <Text style={styles.requiredStar}>
                {' '}
                *
              </Text>
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
                <TouchableOpacity
                  onPress={() => setItemName('')}
                >
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
              <Text style={styles.requiredStar}>
                {' '}
                *
              </Text>
            </Text>

            <View style={styles.quantityInput}>
              <MaterialDesignIcons
                name="scale"
                size={14}
                color="#63706B"
              />

              <TextInput
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                style={styles.quantityTextInput}
              />

              <Text style={styles.quantityUnit}>
                kg
              </Text>
            </View>

            <Text style={styles.quantityHelper}>
              ≈ 18 fresh loaves (~14 kg)
            </Text>
          </View>

          {/* Expiry */}

          <View style={styles.field}>
            <Text style={styles.label}>
              Expiry Time / Window
              <Text style={styles.requiredStar}>
                {' '}
                *
              </Text>
            </Text>

            <TouchableOpacity
              style={styles.textInputContainer}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(
                  'Expiry Time',
                  'Time picker will be connected later.',
                )
              }
            >
              <MaterialDesignIcons
                name="clock-outline"
                size={15}
                color="#68736F"
              />

              <Text style={styles.expiryText}>
                {expiry}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Pickup Location */}

          <View style={styles.field}>
            <Text style={styles.label}>
              Pickup Location
            </Text>

            <View style={styles.locationCard}>
              <View style={styles.locationIcon}>
                <MaterialDesignIcons
                  name="store-outline"
                  size={17}
                  color="#00805A"
                />
              </View>

              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>
                  {location}
                </Text>

                <Text style={styles.locationAddress}>
                  124 Harbor Rd, Secaucus
                  {'\n'}
                  Loading Bay B
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  Alert.alert(
                    'Edit Location',
                    'Location editing will be connected later.',
                  )
                }
              >
                <Text style={styles.editText}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Food Photo */}

          <View style={styles.field}>
            <Text style={styles.label}>
              Food Photo
            </Text>

            <TouchableOpacity
              style={[
                styles.photoBox,
                photoAdded && styles.photoBoxAdded,
              ]}
              activeOpacity={0.8}
              onPress={() => {
                setPhotoAdded(true);
                handlePhotoPress();
              }}
            >
              <View style={styles.cameraCircle}>
                <MaterialDesignIcons
                  name={
                    photoAdded
                      ? 'check'
                      : 'camera-outline'
                  }
                  size={21}
                  color="#00805A"
                />
              </View>

              <Text style={styles.photoTitle}>
                {photoAdded
                  ? 'Photo Selected'
                  : 'Tap to capture or upload food photo'}
              </Text>

              <Text style={styles.photoSubtitle}>
                JPG, PNG up to 5MB (speeds up volunteer
                {'\n'}
                pickup)
              </Text>

              <View style={styles.photoOptions}>
                <View style={styles.photoOption}>
                  <MaterialDesignIcons
                    name="camera-outline"
                    size={12}
                    color="#65716E"
                  />

                  <Text style={styles.photoOptionText}>
                    Camera
                  </Text>
                </View>

                <View style={styles.photoOption}>
                  <MaterialDesignIcons
                    name="image-outline"
                    size={12}
                    color="#65716E"
                  />

                  <Text style={styles.photoOptionText}>
                    Gallery
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
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
            <Text style={styles.clearButtonText}>
              Clear Form
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= NEARBY SHARED FOOD ================= */}

        <View style={styles.nearbyHeader}>
          <View style={styles.nearbyTitleRow}>
            <MaterialDesignIcons
              name="map-marker-radius-outline"
              size={17}
              color="#D47727"
            />

            <Text style={styles.nearbyTitle}>
              Nearby Shared Food
            </Text>

            <View style={styles.liveHubBadge}>
              <View style={styles.smallGreenDot} />

              <Text style={styles.liveHubText}>
                Live Local Hub
              </Text>
            </View>
          </View>

          <Text style={styles.nearbySubtitle}>
            See what local food businesses are offering
            {'\n'}
            right now to coordinate multi-stop logistics.
          </Text>
        </View>

        {/* Nearby card 1 */}

        <NearbyFoodCard
          image="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300"
          title="40 units of Artisanal Breads"
          business="Hearthstone Bakery"
          status="High Demand"
          statusType="demand"
          time="12m ago"
          distance="0.4 km away"
        />

        {/* Nearby card 2 */}

        <NearbyFoodCard
          image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300"
          title="12 kg of Mixed Salad Greens"
          business="Green Leaf Bistro"
          status="Pickup Pending"
          statusType="pending"
          time="45m ago"
          distance="1.1 km away"
        />

        {/* Nearby card 3 */}

        <NearbyFoodCard
          image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=300"
          title="25 L Farm Fresh Whole Milk"
          business="Valley Orchard Gro"
          status="Runner En Route"
          statusType="route"
          time="1h ago"
          distance="1.6 km away"
        />

        <View style={{ height: 25 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================================================
   NEARBY FOOD CARD
========================================================= */

type NearbyFoodCardProps = {
  image: string;
  title: string;
  business: string;
  status: string;
  statusType: 'demand' | 'pending' | 'route';
  time: string;
  distance: string;
};

function NearbyFoodCard({
  image,
  title,
  business,
  status,
  statusType,
  time,
  distance,
}: NearbyFoodCardProps) {
  const getStatusColor = () => {
    if (statusType === 'demand') {
      return {
        background: '#FFE3D5',
        text: '#C76529',
      };
    }

    if (statusType === 'pending') {
      return {
        background: '#EEF1F5',
        text: '#64706C',
      };
    }

    return {
      background: '#D9F2E7',
      text: '#00805A',
    };
  };

  const colors = getStatusColor();

  return (
    <TouchableOpacity
      style={styles.nearbyCard}
      activeOpacity={0.85}
    >
      <Image
        source={{
          uri: image,
        }}
        style={styles.nearbyImage}
      />

      <View style={styles.nearbyCardInfo}>
        <View style={styles.nearbyBusinessRow}>
          <Text style={styles.nearbyBusiness}>
            {business}
          </Text>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: colors.background,
              },
            ]}
          >
            <Text
              style={[
                styles.statusBadgeText,
                {
                  color: colors.text,
                },
              ]}
            >
              {status}
            </Text>
          </View>
        </View>

        <Text style={styles.nearbyFoodTitle}>
          {title}
        </Text>

        <View style={styles.nearbyMeta}>
          <View style={styles.nearbyMetaItem}>
            <MaterialDesignIcons
              name="clock-outline"
              size={11}
              color="#737D79"
            />

            <Text style={styles.nearbyMetaText}>
              {time}
            </Text>
          </View>

          <View style={styles.nearbyMetaItem}>
            <MaterialDesignIcons
              name="map-marker-outline"
              size={11}
              color="#737D79"
            />

            <Text style={styles.nearbyMetaText}>
              {distance}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}