import { StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5EF',
  },

  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  /* ================= HEADER ================= */

  header: {
    height: 52,
    backgroundColor: '#FFFEFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E5DC',
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
    color: '#1C2C25',
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
    backgroundColor: '#FCE9D6',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  headerBadgeText: {
    fontSize: 6.5,
    color: '#B65C20',
    fontWeight: '800',
  },

  wasteTarget: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  wasteTargetText: {
    color: '#26734D',
    fontSize: 6.5,
    fontWeight: '700',
  },

  headerProfile: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#26734D',
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
    color: '#1C2C25',
  },

  pageDescription: {
    fontSize: 8,
    lineHeight: 11,
    color: '#69766E',
    marginTop: 2,
  },

  boldText: {
    fontWeight: '700',
  },

  infoBanner: {
    minHeight: 38,
    backgroundColor: '#E9EEE2',
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
    color: '#526057',
  },

  /* ================= FORM ================= */

  formCard: {
    backgroundColor: '#FFFEFB',
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingTop: 9,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: '#E8E5DC',
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
    backgroundColor: '#E2EDDF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },

  formTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1C2C25',
    flex: 1,
  },

  requiredText: {
    fontSize: 6.5,
    color: '#69766E',
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
    color: '#35443A',
    fontWeight: '700',
    marginBottom: 3,
  },

  requiredStar: {
    color: '#B65C20',
  },

  autoCategorized: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  autoCategorizedText: {
    color: '#26734D',
    fontSize: 6.5,
    fontWeight: '700',
  },

  /* Food type */

  foodTypeSelector: {
    height: 29,
    borderRadius: 7,
    backgroundColor: '#E9EEE2',
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
    color: '#26734D',
  },

  dropdown: {
    marginTop: 3,
    borderRadius: 7,
    backgroundColor: '#FFFEFB',
    borderWidth: 1,
    borderColor: '#E8E5DC',
    overflow: 'hidden',
  },

  dropdownItem: {
    minHeight: 28,
    paddingHorizontal: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFE8',
  },

  dropdownText: {
    fontSize: 8,
    color: '#35443A',
  },

  /* Text inputs */

  textInputContainer: {
    height: 29,
    borderRadius: 7,
    backgroundColor: '#F7F5EF',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textInput: {
    flex: 1,
    height: 29,
    padding: 0,
    fontSize: 8,
    color: '#35443A',
  },

  multilineInput: {
    minHeight: 96,
    borderRadius: 12,
    backgroundColor: '#F7F5EF',
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
    color: '#35443A',
  },

  quantityInput: {
    height: 29,
    borderRadius: 7,
    backgroundColor: '#F7F5EF',
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
    color: '#35443A',
  },

  quantityUnit: {
    fontSize: 8,
    color: '#69766E',
    fontWeight: '700',
  },

  quantityHelper: {
    fontSize: 6.5,
    color: '#899187',
    marginTop: 2,
  },

  expiryText: {
    fontSize: 8,
    color: '#526057',
    marginLeft: 5,
  },

  /* Location */

  locationCard: {
    minHeight: 50,
    backgroundColor: '#F7F5EF',
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
    backgroundColor: '#E2EDDF',
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
    color: '#35443A',
  },

  locationAddress: {
    fontSize: 6.5,
    lineHeight: 8,
    color: '#69766E',
    marginTop: 1,
  },

  editText: {
    fontSize: 7,
    fontWeight: '800',
    color: '#26734D',
    paddingHorizontal: 3,
  },

  /* Photo */

  photoBox: {
    minHeight: 102,
    borderRadius: 7,
    backgroundColor: '#F1EFE8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },

  photoBoxAdded: {
    backgroundColor: '#E9EEE2',
  },

  cameraCircle: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#E2EDDF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },

  photoTitle: {
    fontSize: 7.5,
    fontWeight: '800',
    color: '#526057',
  },

  photoSubtitle: {
    fontSize: 6.5,
    color: '#899187',
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
    color: '#69766E',
  },

  /* Buttons */

  postDonationButton: {
    height: 27,
    borderRadius: 6,
    backgroundColor: '#26734D',
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
    backgroundColor: '#E9EEE2',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearButtonText: {
    color: '#35443A',
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
    color: '#1C2C25',
    marginLeft: 3,
  },

  liveHubBadge: {
    marginLeft: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#E2EDDF',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },

  smallGreenDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#26734D',
  },

  liveHubText: {
    color: '#26734D',
    fontSize: 6,
    fontWeight: '800',
  },

  nearbySubtitle: {
    fontSize: 6.5,
    lineHeight: 8.5,
    color: '#69766E',
    marginTop: 2,
  },

  nearbyCard: {
    minHeight: 62,
    backgroundColor: '#FFFEFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E5DC',
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
    color: '#26734D',
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
    color: '#1C2C25',
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
    color: '#899187',
  },

  trackingNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 17,
    backgroundColor: '#E9EEE2',
  },

  trackingNoteCopy: {
    flex: 1,
  },

  trackingNoteTitle: {
    color: '#1C2C25',
    fontSize: 13,
    fontWeight: '800',
  },

  trackingNoteDescription: {
    color: '#69766E',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
});

export const UserDonationStyles = {
  ...baseStyles,
  container: { ...baseStyles.container, backgroundColor: '#F7F5EF' },
  keyboardAvoiding: { flex: 1 },
  scrollContent: {
    ...baseStyles.scrollContent,
    flexGrow: 1,
    padding: 16,
    paddingBottom: 28,
    gap: 16,
  },
  scroll: { flex: 1 },
  header: {
    ...baseStyles.header,
    minHeight: 64,
    height: undefined,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 10,
  },
  headerTitle: { ...baseStyles.headerTitle, fontSize: 16 },
  headerBadges: {
    ...baseStyles.headerBadges,
    flexWrap: 'wrap' as const,
    gap: 8,
    marginTop: 5,
  },
  headerBadge: {
    ...baseStyles.headerBadge,
    paddingHorizontal: 9,
    paddingVertical: 5,
    gap: 5,
  },
  headerBadgeText: { ...baseStyles.headerBadgeText, fontSize: 11 },
  wasteTarget: { ...baseStyles.wasteTarget, gap: 5 },
  wasteTargetText: { ...baseStyles.wasteTargetText, fontSize: 11 },
  headerProfile: {
    ...baseStyles.headerProfile,
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  titleSection: {
    ...baseStyles.titleSection,
    paddingTop: 4,
    paddingHorizontal: 0,
    marginBottom: 0,
    gap: 8,
  },
  pageTitle: { ...baseStyles.pageTitle, fontSize: 25 },
  pageDescription: {
    ...baseStyles.pageDescription,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 0,
  },
  infoBanner: {
    ...baseStyles.infoBanner,
    minHeight: 54,
    borderRadius: 15,
    marginTop: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  infoBannerText: {
    ...baseStyles.infoBannerText,
    fontSize: 12,
    lineHeight: 18,
  },
  formCard: {
    ...baseStyles.formCard,
    borderRadius: 20,
    padding: 18,
    gap: 16,
    shadowColor: '#1C2C25',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  formHeader: { ...baseStyles.formHeader, marginBottom: 0, gap: 10 },
  formHeaderIcon: {
    ...baseStyles.formHeaderIcon,
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 0,
  },
  formTitle: { ...baseStyles.formTitle, fontSize: 16 },
  requiredText: { ...baseStyles.requiredText, fontSize: 11 },
  field: { ...baseStyles.field, marginBottom: 0, gap: 8 },
  labelRow: { ...baseStyles.labelRow, marginBottom: 0 },
  label: { ...baseStyles.label, fontSize: 13, marginBottom: 0 },
  autoCategorized: { ...baseStyles.autoCategorized, gap: 5 },
  autoCategorizedText: { ...baseStyles.autoCategorizedText, fontSize: 11 },
  foodTypeSelector: {
    ...baseStyles.foodTypeSelector,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  foodTypeLeft: { ...baseStyles.foodTypeLeft, gap: 8 },
  foodTypeText: { ...baseStyles.foodTypeText, fontSize: 14 },
  dropdown: { ...baseStyles.dropdown, marginTop: 6, borderRadius: 12 },
  dropdownItem: {
    ...baseStyles.dropdownItem,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  dropdownText: { ...baseStyles.dropdownText, fontSize: 13 },
  textInputContainer: {
    ...baseStyles.textInputContainer,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  textInput: { ...baseStyles.textInput, height: 48, fontSize: 14 },
  quantityInput: {
    ...baseStyles.quantityInput,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  quantityTextInput: {
    ...baseStyles.quantityTextInput,
    height: 48,
    marginLeft: 0,
    fontSize: 14,
  },
  quantityUnit: { ...baseStyles.quantityUnit, fontSize: 12 },
  quantityHelper: {
    ...baseStyles.quantityHelper,
    fontSize: 11,
    marginTop: 0,
  },
  expiryText: { ...baseStyles.expiryText, fontSize: 14, marginLeft: 8 },
  locationCard: {
    ...baseStyles.locationCard,
    minHeight: 64,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  locationIcon: {
    ...baseStyles.locationIcon,
    width: 38,
    height: 38,
    borderRadius: 10,
    marginRight: 0,
  },
  locationName: { ...baseStyles.locationName, fontSize: 13 },
  locationAddress: {
    ...baseStyles.locationAddress,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },
  editText: { ...baseStyles.editText, fontSize: 12, paddingHorizontal: 6 },
  photoBox: {
    ...baseStyles.photoBox,
    minHeight: 140,
    borderRadius: 15,
    paddingVertical: 16,
  },
  cameraCircle: {
    ...baseStyles.cameraCircle,
    width: 44,
    height: 44,
    borderRadius: 22,
    marginBottom: 8,
  },
  photoTitle: { ...baseStyles.photoTitle, fontSize: 13 },
  photoSubtitle: {
    ...baseStyles.photoSubtitle,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },
  photoOptions: { ...baseStyles.photoOptions, gap: 16, marginTop: 8 },
  photoOption: { ...baseStyles.photoOption, gap: 5 },
  photoOptionText: { ...baseStyles.photoOptionText, fontSize: 11 },
  postDonationButton: {
    ...baseStyles.postDonationButton,
    height: 48,
    borderRadius: 14,
    marginTop: 0,
    gap: 8,
  },
  postDonationText: { ...baseStyles.postDonationText, fontSize: 14 },
  clearButton: {
    ...baseStyles.clearButton,
    height: 44,
    borderRadius: 12,
    marginTop: 0,
  },
  clearButtonText: { ...baseStyles.clearButtonText, fontSize: 13 },
  nearbyHeader: {
    ...baseStyles.nearbyHeader,
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  nearbyTitle: {
    ...baseStyles.nearbyTitle,
    fontSize: 17,
    marginLeft: 6,
  },
  liveHubBadge: {
    ...baseStyles.liveHubBadge,
    marginLeft: 8,
    gap: 5,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  smallGreenDot: {
    ...baseStyles.smallGreenDot,
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  liveHubText: { ...baseStyles.liveHubText, fontSize: 10 },
  nearbySubtitle: {
    ...baseStyles.nearbySubtitle,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  nearbyCard: {
    ...baseStyles.nearbyCard,
    minHeight: 88,
    borderRadius: 15,
    marginBottom: 0,
    padding: 12,
    gap: 12,
    shadowColor: '#1C2C25',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  nearbyImage: {
    ...baseStyles.nearbyImage,
    width: 72,
    height: 68,
    borderRadius: 11,
    marginRight: 0,
  },
  nearbyBusiness: { ...baseStyles.nearbyBusiness, fontSize: 11 },
  statusBadge: {
    ...baseStyles.statusBadge,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusBadgeText: { ...baseStyles.statusBadgeText, fontSize: 10 },
  nearbyFoodTitle: {
    ...baseStyles.nearbyFoodTitle,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  nearbyMeta: { ...baseStyles.nearbyMeta, gap: 12, marginTop: 6 },
  nearbyMetaItem: { ...baseStyles.nearbyMetaItem, gap: 4 },
  nearbyMetaText: { ...baseStyles.nearbyMetaText, fontSize: 10 },
  multilineInput: baseStyles.multilineInput,
  trackingNote: baseStyles.trackingNote,
  trackingNoteCopy: baseStyles.trackingNoteCopy,
  trackingNoteTitle: baseStyles.trackingNoteTitle,
  trackingNoteDescription: baseStyles.trackingNoteDescription,
  bottomSpacing: { height: 24 },
};
