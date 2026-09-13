import { StyleSheet } from 'react-native';

export const UserDonationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  /* ================= HEADER ================= */

  header: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9EEEC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  backButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitleArea: {
    flex: 1,
    marginLeft: 2,
  },

  headerTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#202C28',
  },

  headerBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 2,
  },

  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#FFE7D9',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  headerBadgeText: {
    fontSize: 6.5,
    color: '#C66A2B',
    fontWeight: '800',
  },

  wasteTarget: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  wasteTargetText: {
    color: '#00805A',
    fontSize: 6.5,
    fontWeight: '700',
  },

  headerProfile: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#007E57',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ================= TITLE ================= */

  titleSection: {
    paddingTop: 10,
    paddingHorizontal: 2,
    marginBottom: 8,
  },

  pageTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#202B27',
  },

  pageDescription: {
    fontSize: 8,
    lineHeight: 11,
    color: '#6C7672',
    marginTop: 2,
  },

  boldText: {
    fontWeight: '700',
  },

  infoBanner: {
    minHeight: 38,
    backgroundColor: '#EAF1FC',
    borderRadius: 7,
    marginTop: 7,
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  infoBannerText: {
    fontSize: 7.5,
    lineHeight: 10,
    color: '#66716E',
  },

  /* ================= FORM ================= */

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingTop: 9,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: '#E7EBEA',
  },

  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },

  formHeaderIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#E1F5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  formTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#293531',
    flex: 1,
  },

  requiredText: {
    fontSize: 6.5,
    color: '#6F7975',
  },

  field: {
    marginBottom: 7,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },

  label: {
    fontSize: 7.5,
    color: '#3A4541',
    fontWeight: '700',
    marginBottom: 3,
  },

  requiredStar: {
    color: '#C45F27',
  },

  autoCategorized: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  autoCategorizedText: {
    color: '#00805A',
    fontSize: 6.5,
    fontWeight: '700',
  },

  /* Food type */

  foodTypeSelector: {
    height: 29,
    borderRadius: 7,
    backgroundColor: '#EEF7F2',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  foodTypeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  foodTypeText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#00805A',
  },

  dropdown: {
    marginTop: 3,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E6E4',
    overflow: 'hidden',
  },

  dropdownItem: {
    minHeight: 28,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F1',
  },

  dropdownText: {
    fontSize: 8,
    color: '#36413D',
  },

  /* Text inputs */

  textInputContainer: {
    height: 29,
    borderRadius: 7,
    backgroundColor: '#F0F3F8',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    height: 29,
    padding: 0,
    fontSize: 8,
    color: '#3A4541',
  },

  quantityInput: {
    height: 29,
    borderRadius: 7,
    backgroundColor: '#F0F3F8',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityTextInput: {
    flex: 1,
    height: 29,
    padding: 0,
    marginLeft: 5,
    fontSize: 8,
    color: '#36413D',
  },

  quantityUnit: {
    fontSize: 8,
    color: '#68736F',
    fontWeight: '700',
  },

  quantityHelper: {
    fontSize: 6.5,
    color: '#77817E',
    marginTop: 2,
  },

  expiryText: {
    fontSize: 8,
    color: '#596460',
    marginLeft: 5,
  },

  /* Location */

  locationCard: {
    minHeight: 50,
    backgroundColor: '#F0F3F8',
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationIcon: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#DFF4EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  locationInfo: {
    flex: 1,
  },

  locationName: {
    fontSize: 8,
    fontWeight: '800',
    color: '#35413D',
  },

  locationAddress: {
    fontSize: 6.5,
    lineHeight: 8,
    color: '#747E7A',
    marginTop: 1,
  },

  editText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#00805A',
    paddingHorizontal: 3,
  },

  /* Photo */

  photoBox: {
    minHeight: 102,
    borderRadius: 7,
    backgroundColor: '#EEF3FB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },

  photoBoxAdded: {
    backgroundColor: '#EAF7F1',
  },

  cameraCircle: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#DDF3EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },

  photoTitle: {
    fontSize: 7.5,
    fontWeight: '800',
    color: '#596561',
  },

  photoSubtitle: {
    fontSize: 6.5,
    color: '#7B8581',
    textAlign: 'center',
    lineHeight: 8,
    marginTop: 2,
  },

  photoOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },

  photoOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  photoOptionText: {
    fontSize: 6.5,
    color: '#68736F',
  },

  /* Buttons */

  postDonationButton: {
    height: 27,
    borderRadius: 6,
    backgroundColor: '#00805A',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },

  postDonationText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },

  clearButton: {
    height: 25,
    borderRadius: 6,
    backgroundColor: '#E7EEFC',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearButtonText: {
    color: '#38443F',
    fontSize: 7,
    fontWeight: '700',
  },

  /* ================= NEARBY ================= */

  nearbyHeader: {
    paddingTop: 10,
    paddingHorizontal: 2,
    paddingBottom: 6,
  },

  nearbyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  nearbyTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#293530',
    marginLeft: 3,
  },

  liveHubBadge: {
    marginLeft: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#E0F5EC',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  smallGreenDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00A36D',
  },

  liveHubText: {
    color: '#00805A',
    fontSize: 6,
    fontWeight: '800',
  },

  nearbySubtitle: {
    fontSize: 6.5,
    lineHeight: 8.5,
    color: '#727D79',
    marginTop: 2,
  },

  nearbyCard: {
    minHeight: 62,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8ECEB',
    marginBottom: 6,
    padding: 5,
    flexDirection: 'row',
  },

  nearbyImage: {
    width: 58,
    height: 50,
    borderRadius: 6,
    marginRight: 7,
  },

  nearbyCardInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  nearbyBusinessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  nearbyBusiness: {
    fontSize: 6.5,
    color: '#00805A',
    fontWeight: '800',
    flex: 1,
  },

  statusBadge: {
    borderRadius: 7,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  statusBadgeText: {
    fontSize: 5.5,
    fontWeight: '800',
  },

  nearbyFoodTitle: {
    fontSize: 8.5,
    lineHeight: 10,
    fontWeight: '800',
    color: '#343F3B',
    marginTop: 2,
  },

  nearbyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 3,
  },

  nearbyMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  nearbyMetaText: {
    fontSize: 6,
    color: '#77817E',
  },
});