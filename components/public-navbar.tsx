// Public navigation bar used across all unauthenticated pages.
// This component keeps branding and navigation consistent on the landing,
// learn, about, login, and register screens.
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

// Props allow this navbar to switch between a full navigation mode
// and a minimal branding-only mode for authentication pages.
type PublicNavbarProps = {
  showAuthButtons?: boolean;
  minimal?: boolean;
};

// PublicNavbar renders the shared top navigation for public-facing pages.
// It supports:
// 1. Full mode: logo, navigation links, and auth actions
// 2. Minimal mode: logo and app name only
// This helps keep login and register pages distraction-free.
export default function PublicNavbar({
  showAuthButtons = true,
  minimal = false,
}: PublicNavbarProps) {
  // Read the current viewport width so the navbar can switch
  // between desktop navigation and a compact mobile menu.
  const { width } = useWindowDimensions();

  // Reads the current pathname so the active page can be highlighted
  // across the public navigation.
  const pathname = usePathname();

  // Screens below 768px use the mobile navigation layout.
  const isMobile = width < 768;

  // Tracks whether the mobile dropdown menu is currently expanded.
  const [menuOpen, setMenuOpen] = useState(false);

  // Returns the user to the landing page and closes the mobile menu if it is open.
  const goHome = () => {
    setMenuOpen(false);
    router.push("/");
  };

  // Navigates to the Learn page and closes the mobile menu.
  const goLearn = () => {
    setMenuOpen(false);
    router.push("/learn");
  };

  // Navigates to the About page and closes the mobile menu.
  const goAbout = () => {
    setMenuOpen(false);
    router.push("/about");
  };

  // Navigates to the Login page and closes the mobile menu.
  const goLogin = () => {
    setMenuOpen(false);
    router.push("/login");
  };

  // Navigates to the Register page and closes the mobile menu.
  const goRegister = () => {
    setMenuOpen(false);
    router.push("/register");
  };

  // Returns true when the current pathname matches the supplied public route.
  const isActiveRoute = (route: string) => pathname === route;

  // Reusable desktop navigation item with active-state styling.
  const renderDesktopNavItem = (
    label: string,
    onPress: () => void,
    route: string,
  ) => {
    const active = isActiveRoute(route);

    return (
      <Pressable
        key={route}
        onPress={onPress}
        style={active ? styles.activeNavPill : undefined}
      >
        <Text style={active ? styles.activeNavText : styles.navLink}>
          {label}
        </Text>
      </Pressable>
    );
  };

  // Reusable mobile navigation item with active-state styling.
  const renderMobileNavItem = (
    label: string,
    onPress: () => void,
    route: string,
  ) => {
    const active = isActiveRoute(route);

    return (
      <Pressable
        key={route}
        onPress={onPress}
        style={active ? styles.mobileActiveNavPill : undefined}
      >
        <Text
          style={active ? styles.mobileActiveNavText : styles.mobileNavLink}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  // Render shared navbar layout.
  // Desktop users see inline navigation, while mobile users see a menu toggle.
  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        {/* Brand area: clicking the logo or app name always goes back to the landing page. */}
        <Pressable style={styles.brandContainer} onPress={goHome}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandText}>HealthyLife</Text>
        </Pressable>

        {/* In minimal mode, hide all right-side links so auth pages only show branding.
            In full mode, show either desktop links or a mobile menu button. */}
        {!minimal &&
          (isMobile ? (
            <Pressable
              style={styles.menuButton}
              onPress={() => setMenuOpen((prev) => !prev)}
            >
              <Text style={styles.menuButtonText}>{menuOpen ? "✕" : "☰"}</Text>
            </Pressable>
          ) : (
            <>
              {/* Desktop navigation: links remain visible in the top bar. */}
              <View style={styles.desktopNav}>
                {renderDesktopNavItem("Home", goHome, "/")}
                {renderDesktopNavItem("Learn", goLearn, "/learn")}
                {renderDesktopNavItem("About", goAbout, "/about")}

                {/* Auth actions are optional so the same navbar can be reused on pages
                    where sign-in and sign-up buttons are needed. */}
                {showAuthButtons && (
                  <>
                    {renderDesktopNavItem("Sign In", goLogin, "/login")}
                    {renderDesktopNavItem("Sign Up", goRegister, "/register")}
                  </>
                )}
              </View>
            </>
          ))}
      </View>

      {/* Mobile dropdown menu is only shown on smaller screens when the menu button is open.
          It is hidden completely in minimal mode. */}
      {!minimal && isMobile && menuOpen && (
        <View style={styles.mobileMenu}>
          {renderMobileNavItem("Home", goHome, "/")}
          {renderMobileNavItem("Learn", goLearn, "/learn")}
          {renderMobileNavItem("About", goAbout, "/about")}

          {/* Auth actions are repeated inside the mobile dropdown for smaller screens. */}
          {showAuthButtons && (
            <>
              {renderMobileNavItem("Sign In", goLogin, "/login")}
              {renderMobileNavItem("Sign Up", goRegister, "/register")}
            </>
          )}
        </View>
      )}
    </View>
  );
}

// Styles control navbar layout, spacing, typography, and responsive menu appearance.
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 12,
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 42,
    height: 42,
    marginRight: 10,
  },
  brandText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  desktopNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  navLink: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  activeNavPill: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  activeNavText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  menuButton: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  mobileMenu: {
    marginTop: 14,
    backgroundColor: "#2A3158",
    borderRadius: 18,
    padding: 16,
    gap: 14,
  },
  mobileNavLink: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  mobileActiveNavPill: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  mobileActiveNavText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
