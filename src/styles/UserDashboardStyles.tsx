import { StyleSheet } from 'react-native';

export const UserDashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },

  scrollContent: {
    paddingHorizontal: 13,
    paddingBottom: 10,
  },

  /* Header */

  header: {
    height: 56,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F0',
  },

  menuButton: {
    width: 35,
    alignItems: 'flex-start',
  },

  logoArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },

  logoIcon: {
    width: 29,
    height: 29,
    borderRadius: 8,
    backgroundColor: '#E0F5EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },

  logoText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E2B27',
  },

  logoSubtext: {
    fontSize: 9,
    color: '#00805A',
    fontWeight: '700',
    marginTop: -1,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  notificationButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D66B26',
    right: 2,
    top: 3,
  },

  profileCircle: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#007D57',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Welcome */

  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 13,
  },

  welcomeText: {
    flex: 1,
  },

  welcomeTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#17221F',
  },

  welcomeSubtitle: {
    fontSize: 9.5,
    color: '#68736F',
    marginTop: 2,
  },

  activeDot: {
    color: '#00805A',
    fontWeight: '900',
  },

  activeText: {
    color: '#00805A',
    fontWeight: '700',
  },

  welcomeAvatar: {
    width: 42,
    height: 42,
    borderRadius: 22,
    marginLeft: 10,
  },

  /* Stats */

  statsRow: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 14,
  },

  statCard: {
    flex: 1,
    minHeight: 78,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 9,
    borderWidth: 1,
    borderColor: '#EEF1F2',
  },

  statTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  statIcon: {
    width: 27,
    height: 24,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statTopText: {
    fontSize: 8,
    fontWeight: '800',
  },

  statNumber: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '800',
    color: '#1A2622',
    marginTop: 4,
  },

  statLabel: {
    fontSize: 8.5,
    color: '#6A7471',
    marginTop: 0,
  },

  /* Surplus */

  surplusCard: {
    height: 139,
    borderRadius: 11,
    backgroundColor: '#007B54',
    paddingHorizontal: 20,
    paddingTop: 12,
    overflow: 'hidden',
    marginBottom: 14,
  },

  initiativeBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },

  initiativeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },

  surplusTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 5,
  },

  surplusDescription: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 8.5,
    lineHeight: 12,
    marginTop: 3,
  },

  postButton: {
    height: 28,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 9,
  },

  postButtonText: {
    color: '#007B54',
    fontSize: 9,
    fontWeight: '800',
  },

  bannerDecoration: {
    position: 'absolute',
    right: -12,
    bottom: -29,
  },

  /* Sections */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1B2723',
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00A96F',
  },

  viewAll: {
    color: '#007B54',
    fontSize: 9,
    fontWeight: '700',
  },

  /* Tracking */

  trackingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    padding: 9,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEF1F2',
  },

  trackingTop: {
    minHeight: 61,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  foodImage: {
    width: 54,
    height: 42,
    borderRadius: 7,
    marginRight: 8,
    marginTop: 3,
  },

  foodInfo: {
    flex: 1,
  },

  foodTitle: {
    fontSize: 12,
    lineHeight: 13,
    fontWeight: '800',
    color: '#293430',
  },

  batchText: {
    fontSize: 8.5,
    color: '#727C79',
    marginTop: 2,
  },

  volunteerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  volunteerText: {
    fontSize: 7.5,
    fontWeight: '700',
  },

  /* Progress */

  progressContainer: {
    backgroundColor: '#F0F4FF',
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 5,
  },

  progressLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  progressLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  progressText: {
    fontSize: 7.5,
    fontWeight: '700',
    color: '#00805A',
  },

  orangeProgress: {
    color: '#C66A2C',
  },

  deliveredText: {
    fontSize: 7.5,
    color: '#7B8582',
  },

  progressBar: {
    height: 4,
    borderRadius: 5,
    backgroundColor: '#DCE5F6',
    overflow: 'hidden',
    marginTop: 3,
  },

  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#00805A',
  },

  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  personAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 7,
  },

  personInfo: {
    flex: 1,
  },

  personName: {
    fontSize: 9,
    fontWeight: '800',
    color: '#303B37',
  },

  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 1,
  },

  etaText: {
    color: '#00805A',
    fontSize: 8,
  },

  callButton: {
    width: 39,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF3FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },

  chatButton: {
    width: 39,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#00A878',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },

  warningRow: {
    height: 25,
    borderRadius: 8,
    backgroundColor: '#F4F5F7',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 6,
    gap: 4,
  },

  warningText: {
    color: '#68726F',
    fontSize: 7.5,
    fontWeight: '600',
  },

  expiringText: {
    color: '#C66A2C',
    fontWeight: '800',
  },

  /* Insights */

  insightsHeader: {
    marginTop: 1,
    marginBottom: 7,
  },

  insightsRow: {
    flexDirection: 'row',
    gap: 8,
  },

  insightCard: {
    flex: 1,
    minHeight: 86,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EEF1F2',
  },

  insightTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  insightGreen: {
    color: '#00805A',
    fontSize: 8,
    fontWeight: '800',
  },

  insightOrange: {
    color: '#C66A2C',
    fontSize: 8,
    fontWeight: '800',
  },

  insightNumber: {
    color: '#202C28',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 3,
  },

  insightDescription: {
    color: '#7A8380',
    fontSize: 8,
    lineHeight: 10,
    marginTop: 1,
  },

  /* Bottom Nav */

  bottomNavigation: {
    height: 62,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9EDEC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 4,
  },

  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },

  bottomTabText: {
    fontSize: 8,
    color: '#65716E',
    fontWeight: '600',
  },

  bottomTabTextActive: {
    color: '#00805A',
    fontWeight: '800',
  },
});