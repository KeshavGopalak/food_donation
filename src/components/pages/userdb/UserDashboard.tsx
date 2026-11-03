import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { UserDashboardStyles as styles } from '../../../styles/UserDashboardStyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  UserDashboard: undefined;
  UserDonation: undefined;
  UserProfile: undefined;
};

// 2. Define the navigation prop type for this screen
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserDashboard'
>;

// Gets the exact "name" type from your installed icon package
type MaterialDesignIconName =
  React.ComponentProps<typeof MaterialDesignIcons>['name'];

export default function UserDashboard() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F7F9FC"
      />

      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.7}
        >
          <MaterialDesignIcons
            name="menu"
            size={25}
            color="#26322F"
          />
        </TouchableOpacity>

        <View style={styles.logoArea}>
          <View style={styles.logoIcon}>
            <MaterialDesignIcons
              name="truck-fast-outline"
              size={19}
              color="#00805A"
            />
          </View>

          <View>
            <Text style={styles.logoText}>
              Vitality Logistics
            </Text>

            <Text style={styles.logoSubtext}>
              Overview
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.7}
          >
            <MaterialDesignIcons
              name="bell-outline"
              size={21}
              color="#26322F"
            />

            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileCircle}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('UserProfile')}
          >
            <MaterialDesignIcons
              name="account-outline"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CONTENT ================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome */}

        <View style={styles.welcomeRow}>
          <View style={styles.welcomeText}>
            <Text style={styles.welcomeTitle}>
              Welcome back, Elena
            </Text>

            <Text style={styles.welcomeSubtitle}>
              The Green Hearth Bakery{' '}
              <Text style={styles.activeDot}>
                •
              </Text>{' '}
              <Text style={styles.activeText}>
                Active Donor
              </Text>
            </Text>
          </View>

          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
            }}
            style={styles.welcomeAvatar}
          />
        </View>

        {/* ================= STATS ================= */}

        <View style={styles.statsRow}>
          <StatCard
            icon="truck-check-outline"
            iconBackground="#DDF5EB"
            iconColor="#00805A"
            topText="+1"
            topColor="#00805A"
            number="3"
            label="Active"
          />

          <StatCard
            icon="food-outline"
            iconBackground="#FFF0E3"
            iconColor="#D06B25"
            topText="Total"
            topColor="#C36527"
            number="450"
            label="Meals Shared"
          />

          <StatCard
            icon="domain"
            iconBackground="#E6EEFF"
            iconColor="#3268C7"
            topText="5 Dist."
            topColor="#3268C7"
            number="12"
            label="Shelters"
          />
        </View>

        {/* ================= SURPLUS FOOD ================= */}

        <View style={styles.surplusCard}>
          <View style={styles.initiativeBadge}>
            <MaterialDesignIcons
              name="leaf"
              size={12}
              color="#FFFFFF"
            />

            <Text style={styles.initiativeText}>
              Zero Food Waste Initiative
            </Text>
          </View>

          <Text style={styles.surplusTitle}>
            Ready to share?
          </Text>

          <Text style={styles.surplusDescription}>
            Submit your excess inventory and our{'\n'}
            verified logistics volunteers will collect and{'\n'}
            deliver safely.
          </Text>

          <TouchableOpacity
            style={styles.postButton}
            activeOpacity={0.8}
          >
            <MaterialDesignIcons
              name="plus-circle-outline"
              size={17}
              color="#00805A"
            />

            <Text style={styles.postButtonText} onPress={() => navigation.navigate('UserDonation')}>
              Post Surplus Food
            </Text>
          </TouchableOpacity>

          <View style={styles.bannerDecoration}>
            <MaterialDesignIcons
              name="leaf"
              size={100}
              color="rgba(255,255,255,0.07)"
            />
          </View>
        </View>

        {/* ================= LIVE TRACKINGS ================= */}

        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>
              Live Trackings
            </Text>

            <View style={styles.liveDot} />
          </View>

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAll}>
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tracking #1 */}

        <TrackingCard
          image="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300"
          title={'Assorted\nPastries &\nBread'}
          batch="Batch #VO-294"
          weight="15.5 kg"
          volunteer="Volunteer Assigned"
          volunteerColor="#D8F3E8"
          volunteerTextColor="#00805A"
          person="Marcus Chen"
          eta="ETA 12 mins"
          progressType="enroute"
        />

        {/* Tracking #2 */}

        <TrackingCard
          image="https://images.unsplash.com/photo-1547592180-85f173990554?w=300"
          title={'Vegetable Stew\n(Large Tray)'}
          batch="Batch #VO-301"
          weight="8.0 kg"
          volunteer="Awaiting Pickup"
          volunteerColor="#FFE1D5"
          volunteerTextColor="#D86A35"
          progressType="waiting"
        />

        {/* ================= QUICK INSIGHTS ================= */}

        <View
          style={[
            styles.sectionHeader,
            styles.insightsHeader,
          ]}
        >
          <Text style={styles.sectionTitle}>
            Quick Insights
          </Text>
        </View>

        <View style={styles.insightsRow}>
          {/* CO2 */}

          <View style={styles.insightCard}>
            <View style={styles.insightTitleRow}>
              <MaterialDesignIcons
                name="recycle"
                size={15}
                color="#00805A"
              />

              <Text style={styles.insightGreen}>
                CO₂ Saved
              </Text>
            </View>

            <Text style={styles.insightNumber}>
              12.5 kg
            </Text>

            <Text style={styles.insightDescription}>
              Equivalent to 31{'\n'}
              miles driven
            </Text>
          </View>

          {/* Most Donated */}

          <View style={styles.insightCard}>
            <View style={styles.insightTitleRow}>
              <MaterialDesignIcons
                name="food"
                size={15}
                color="#C96A29"
              />

              <Text style={styles.insightOrange}>
                Most Donated
              </Text>
            </View>

            <Text style={styles.insightNumber}>
              Bakery Goods
            </Text>

            <Text style={styles.insightDescription}>
              68% of your total{'\n'}
              contributions
            </Text>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* ================= BOTTOM NAVIGATION ================= */}

      <View style={styles.bottomNavigation}>
        <BottomTab
          icon="view-dashboard-outline"
          label="Overview"
          active
        />

        <BottomTab
          icon="plus-circle-outline"
          label="Actions"
        />

        <BottomTab
          icon="truck-delivery-outline"
          label="Deliveries"
        />

        <BottomTab
          icon="account-outline"
          label="Profile"
        />
      </View>
    </SafeAreaView>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

type StatCardProps = {
  icon: MaterialDesignIconName;
  iconBackground: string;
  iconColor: string;
  topText: string;
  topColor: string;
  number: string;
  label: string;
};

function StatCard({
  icon,
  iconBackground,
  iconColor,
  topText,
  topColor,
  number,
  label,
}: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTopRow}>
        <View
          style={[
            styles.statIcon,
            {
              backgroundColor: iconBackground,
            },
          ]}
        >
          <MaterialDesignIcons
            name={icon}
            size={16}
            color={iconColor}
          />
        </View>

        <Text
          style={[
            styles.statTopText,
            {
              color: topColor,
            },
          ]}
        >
          {topText}
        </Text>
      </View>

      <Text style={styles.statNumber}>
        {number}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

/* =========================================================
   TRACKING CARD
========================================================= */

type TrackingCardProps = {
  image: string;
  title: string;
  batch: string;
  weight: string;
  volunteer: string;
  volunteerColor: string;
  volunteerTextColor: string;
  person?: string;
  eta?: string;
  progressType: 'enroute' | 'waiting';
};

function TrackingCard({
  image,
  title,
  batch,
  weight,
  volunteer,
  volunteerColor,
  volunteerTextColor,
  person,
  eta,
  progressType,
}: TrackingCardProps) {
  const isEnroute =
    progressType === 'enroute';

  return (
    <View style={styles.trackingCard}>
      {/* Food information */}

      <View style={styles.trackingTop}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.foodImage}
        />

        <View style={styles.foodInfo}>
          <Text style={styles.foodTitle}>
            {title}
          </Text>

          <Text style={styles.batchText}>
            {batch} • {weight}
          </Text>
        </View>

        <View
          style={[
            styles.volunteerBadge,
            {
              backgroundColor: volunteerColor,
            },
          ]}
        >
          <Text
            style={[
              styles.volunteerText,
              {
                color: volunteerTextColor,
              },
            ]}
          >
            {volunteer}
          </Text>
        </View>
      </View>

      {/* Progress */}

      <View style={styles.progressContainer}>
        <View style={styles.progressLabels}>
          <View style={styles.progressLabel}>
            <MaterialDesignIcons
              name="check-circle-outline"
              size={12}
              color="#00805A"
            />

            <Text style={styles.progressText}>
              Matched
            </Text>
          </View>

          <View style={styles.progressLabel}>
            <MaterialDesignIcons
              name={
                isEnroute
                  ? 'truck-fast-outline'
                  : 'clock-outline'
              }
              size={12}
              color={
                isEnroute
                  ? '#00805A'
                  : '#C66A2C'
              }
            />

            <Text
              style={[
                styles.progressText,
                !isEnroute &&
                  styles.orangeProgress,
              ]}
            >
              {isEnroute
                ? 'Pickup (En route)'
                : 'Awaiting Driver'}
            </Text>
          </View>

          <Text style={styles.deliveredText}>
            Delivered
          </Text>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: isEnroute
                  ? '68%'
                  : '42%',
              },
            ]}
          />
        </View>
      </View>

      {/* Driver */}

      {isEnroute && person && (
        <View style={styles.personRow}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
            }}
            style={styles.personAvatar}
          />

          <View style={styles.personInfo}>
            <Text style={styles.personName}>
              {person}
            </Text>

            <View style={styles.etaRow}>
              <MaterialDesignIcons
                name="clock-outline"
                size={12}
                color="#00805A"
              />

              <Text style={styles.etaText}>
                {eta}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.callButton}
            activeOpacity={0.7}
          >
            <MaterialDesignIcons
              name="phone-outline"
              size={19}
              color="#26322F"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chatButton}
            activeOpacity={0.7}
          >
            <MaterialDesignIcons
              name="message-text-outline"
              size={19}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Waiting warning */}

      {!isEnroute && (
        <View style={styles.warningRow}>
          <MaterialDesignIcons
            name="alert-outline"
            size={15}
            color="#C66A2C"
          />

          <Text style={styles.warningText}>
            Ready at service entrance •{' '}
            <Text style={styles.expiringText}>
              Expiring in 2h
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}

/* =========================================================
   BOTTOM TAB
========================================================= */

type BottomTabProps = {
  icon: MaterialDesignIconName;
  label: string;
  active?: boolean;
};

function BottomTab({
  icon,
  label,
  active = false,
}: BottomTabProps) {
  return (
    <TouchableOpacity
      style={styles.bottomTab}
      activeOpacity={0.7}
    >
      <MaterialDesignIcons
        name={icon}
        size={21}
        color={
          active
            ? '#00805A'
            : '#65716E'
        }
      />

      <Text
        style={[
          styles.bottomTabText,
          active &&
            styles.bottomTabTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}