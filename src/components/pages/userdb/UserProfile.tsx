import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

import { UserProfileStyles } from "../../../styles/UserProfileStyles";

export default function UserProfile() {
  return (
    <SafeAreaView style={UserProfileStyles.container}>
      {/* Header */}
      <View style={UserProfileStyles.header}>
        <TouchableOpacity>
          <MaterialDesignIcons
            name="menu"
            size={21}
            color="#65706D"
          />
        </TouchableOpacity>

        <Text style={UserProfileStyles.headerTitle}>
          Vitality Logistics
        </Text>

        <TouchableOpacity>
          <MaterialDesignIcons
            name="bell-outline"
            size={20}
            color="#65706D"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={UserProfileStyles.scrollContent}
      >
        {/* Cover Photo */}
        <View style={UserProfileStyles.profileHeader}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=900&q=80",
            }}
            style={UserProfileStyles.coverImage}
          />

          {/* Profile Picture */}
          <View style={UserProfileStyles.avatarWrapper}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
              }}
              style={UserProfileStyles.avatar}
            />
          </View>

          {/* Edit Profile */}
          <TouchableOpacity
            style={UserProfileStyles.editButton}
            activeOpacity={0.8}
          >
            <Text style={UserProfileStyles.editButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          {/* User Information */}
          <View style={UserProfileStyles.userInfo}>
            <Text style={UserProfileStyles.userName}>
              Elena Rodriguez
            </Text>

            <View style={UserProfileStyles.infoRow}>
              <MaterialDesignIcons
                name="storefront-outline"
                size={13}
                color="#65706D"
              />

              <Text style={UserProfileStyles.infoText}>
                Green Heart Bakery
              </Text>
            </View>

            <View style={UserProfileStyles.infoRow}>
              <MaterialDesignIcons
                name="map-marker-outline"
                size={13}
                color="#65706D"
              />

              <Text style={UserProfileStyles.infoText}>
                Portland, OR
              </Text>
            </View>
          </View>
        </View>

        {/* Community Impact */}
        <Text style={UserProfileStyles.sectionTitle}>
          Community Impact
        </Text>

        <View style={UserProfileStyles.impactRow}>
          {/* Meals Shared */}
          <View style={UserProfileStyles.impactCard}>
            <View style={UserProfileStyles.impactTitleRow}>
              <MaterialDesignIcons
                name="food-outline"
                size={15}
                color="#00875A"
              />

              <Text style={UserProfileStyles.impactLabel}>
                Meals Shared
              </Text>
            </View>

            <Text style={UserProfileStyles.impactNumber}>
              1,420
            </Text>

            <Text style={UserProfileStyles.impactGrowth}>
              ↗ +12% this month
            </Text>
          </View>

          {/* Shelters */}
          <View style={UserProfileStyles.impactCard}>
            <View style={UserProfileStyles.impactTitleRow}>
              <MaterialDesignIcons
                name="home-city-outline"
                size={15}
                color="#D86B20"
              />

              <Text style={UserProfileStyles.impactLabelOrange}>
                Shelters
              </Text>
            </View>

            <Text style={UserProfileStyles.impactNumber}>
              4
            </Text>

            <Text style={UserProfileStyles.impactDescription}>
              Active partnerships
            </Text>
          </View>
        </View>

        {/* Total Food Rescued */}
        <View style={UserProfileStyles.rescuedCard}>
          <View>
            <Text style={UserProfileStyles.rescuedLabel}>
              Total Food Rescued
            </Text>

            <Text style={UserProfileStyles.rescuedNumber}>
              2,850 lbs
            </Text>
          </View>

          <View style={UserProfileStyles.rescuedIcon}>
            <MaterialDesignIcons
              name="leaf"
              size={19}
              color="#00875A"
            />
          </View>
        </View>

        {/* About */}
        <View style={UserProfileStyles.aboutCard}>
          <View style={UserProfileStyles.aboutTitleRow}>
            <MaterialDesignIcons
              name="information-outline"
              size={17}
              color="#3F4846"
            />

            <Text style={UserProfileStyles.aboutTitle}>
              About
            </Text>
          </View>

          <Text style={UserProfileStyles.aboutText}>
            Green Heart Bakery is committed to ensuring no good
            food goes to waste. We bake fresh artisan breads and
            pastries daily. Any surplus at the end of the day is
            proudly donated to local shelters and community
            centers to support those in need in the Portland area.
          </Text>

          <View style={UserProfileStyles.aboutDivider} />

          {/* Donor Since / Status */}
          <View style={UserProfileStyles.detailsRow}>
            <View style={UserProfileStyles.detailBox}>
              <Text style={UserProfileStyles.detailLabel}>
                Donor Since
              </Text>

              <Text style={UserProfileStyles.detailValue}>
                Mar 2023
              </Text>
            </View>

            <View style={UserProfileStyles.detailBox}>
              <Text style={UserProfileStyles.detailLabel}>
                Status
              </Text>

              <View style={UserProfileStyles.verifiedRow}>
                <MaterialDesignIcons
                  name="check-circle"
                  size={13}
                  color="#00875A"
                />

                <Text style={UserProfileStyles.verifiedText}>
                  Verified
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing for floating button */}
        <View style={UserProfileStyles.bottomSpacing} />
      </ScrollView>

      {/* Post Food Button */}
      <TouchableOpacity
        style={UserProfileStyles.postFoodButton}
        activeOpacity={0.85}
      >
        <MaterialDesignIcons
          name="plus-box-outline"
          size={16}
          color="#FFFFFF"
        />

        <Text style={UserProfileStyles.postFoodText}>
          Post Food
        </Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={UserProfileStyles.bottomNav}>
        <TouchableOpacity style={UserProfileStyles.navItem}>
          <MaterialDesignIcons
            name="view-grid-outline"
            size={19}
            color="#64706D"
          />

          <Text style={UserProfileStyles.navText}>
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={UserProfileStyles.navItem}>
          <MaterialDesignIcons
            name="plus-circle-outline"
            size={19}
            color="#64706D"
          />

          <Text style={UserProfileStyles.navText}>
            Actions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            UserProfileStyles.navItem,
            UserProfileStyles.activeNavItem,
          ]}
        >
          <FontAwesome6
            name="user"
            size={15}
            color="#FFFFFF"
          />

          <Text style={UserProfileStyles.activeNavText}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}