import { StyleSheet } from "react-native";

export const UserProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F6",
  },

  scrollContent: {
    paddingBottom: 90,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    height: 43,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E7EBE9",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 16,
  },

  headerTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#007B5E",
  },

  /* =========================
     PROFILE HEADER
  ========================= */

  profileHeader: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E5E2",
    paddingBottom: 13,
  },

  coverImage: {
    width: "100%",
    height: 70,
    resizeMode: "cover",
  },

  avatarWrapper: {
    position: "absolute",
    top: 43,
    left: 17,

    width: 58,
    height: 58,
    borderRadius: 29,

    backgroundColor: "#FFFFFF",
    padding: 3,

    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 27,
  },

  editButton: {
    position: "absolute",
    right: 9,
    top: 78,

    borderWidth: 1,
    borderColor: "#00875A",
    borderRadius: 16,

    paddingHorizontal: 12,
    paddingVertical: 6,

    backgroundColor: "#FFFFFF",
  },

  editButtonText: {
    color: "#007B5E",
    fontSize: 10,
    fontWeight: "600",
  },

  userInfo: {
    paddingHorizontal: 17,
    paddingTop: 38,
  },

  userName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#293331",
    marginBottom: 5,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  infoText: {
    fontSize: 9,
    color: "#697572",
    marginLeft: 4,
  },

  /* =========================
     COMMUNITY IMPACT
  ========================= */

  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#35403D",

    paddingHorizontal: 9,
    marginTop: 12,
    marginBottom: 5,
  },

  impactRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
    gap: 5,
  },

  impactCard: {
    flex: 1,
    minHeight: 67,

    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDE5E1",
    borderRadius: 7,

    padding: 8,
  },

  impactTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  impactLabel: {
    fontSize: 7,
    fontWeight: "700",
    color: "#00875A",
    marginLeft: 3,
  },

  impactLabelOrange: {
    fontSize: 7,
    fontWeight: "700",
    color: "#C75D20",
    marginLeft: 3,
  },

  impactNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26312E",
    marginBottom: 1,
  },

  impactGrowth: {
    fontSize: 7,
    color: "#00875A",
  },

  impactDescription: {
    fontSize: 7,
    color: "#697572",
  },

  /* =========================
     FOOD RESCUED
  ========================= */

  rescuedCard: {
    marginHorizontal: 8,
    marginTop: 5,

    minHeight: 45,

    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#BFDCD4",

    backgroundColor: "#E7F5F1",

    paddingHorizontal: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rescuedLabel: {
    fontSize: 7,
    color: "#4E6963",
    marginBottom: 1,
  },

  rescuedNumber: {
    fontSize: 12,
    fontWeight: "700",
    color: "#00875A",
  },

  rescuedIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,

    backgroundColor: "#D1ECE5",

    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
     ABOUT
  ========================= */

  aboutCard: {
    marginHorizontal: 8,
    marginTop: 8,

    backgroundColor: "#FFFFFF",
    borderRadius: 7,

    borderWidth: 1,
    borderColor: "#DDE5E1",

    padding: 10,
  },

  aboutTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  aboutTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#35403D",
    marginLeft: 5,
  },

  aboutText: {
    fontSize: 9,
    lineHeight: 14,
    color: "#596561",
  },

  aboutDivider: {
    height: 1,
    backgroundColor: "#E4E9E7",
    marginVertical: 9,
  },

  detailsRow: {
    flexDirection: "row",
    gap: 8,
  },

  detailBox: {
    flex: 1,

    height: 37,

    borderWidth: 1,
    borderColor: "#E0E7E4",
    borderRadius: 5,

    backgroundColor: "#F8FAF9",

    alignItems: "center",
    justifyContent: "center",
  },

  detailLabel: {
    fontSize: 7,
    color: "#68746F",
    marginBottom: 2,
  },

  detailValue: {
    fontSize: 9,
    fontWeight: "600",
    color: "#35403D",
  },

  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  verifiedText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#00875A",
    marginLeft: 3,
  },

  /* =========================
     POST FOOD BUTTON
  ========================= */

  postFoodButton: {
    position: "absolute",
    right: 9,
    bottom: 52,

    height: 32,

    paddingHorizontal: 13,

    borderRadius: 17,

    backgroundColor: "#007B5E",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },

  postFoodText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "700",
    marginLeft: 5,
  },

  /* =========================
     BOTTOM NAV
  ========================= */

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    height: 50,

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#E0E6E3",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    elevation: 10,
  },

  navItem: {
    width: 62,
    height: 39,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  activeNavItem: {
    backgroundColor: "#00A978",
  },

  navText: {
    fontSize: 7,
    color: "#68736F",
    marginTop: 2,
  },

  activeNavText: {
    fontSize: 7,
    color: "#FFFFFF",
    fontWeight: "600",
    marginTop: 2,
  },

  bottomSpacing: {
    height: 30,
  },
});