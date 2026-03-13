

import React, { createContext, useContext, useRef, useState } from "react";

const ScrollContext = createContext();

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within ScrollProvider");
  }
  return context;
};

export const ScrollProvider = ({ children }) => {
  const sectionRefs = useRef({});
  const [activeSection, setActiveSection] = useState(null);

  // ✅ SINGLE, UNIFIED SCROLL FUNCTION - Find VISIBLE element only
  const scrollToSection = (brandId) => {
    // console.log(`🔍 Attempting to scroll to: brand-${brandId}`);

    const isMobile = window.innerWidth <= 768;

    // Wait for DOM to be ready
    setTimeout(() => {
      // ✅ FIX: Find ALL elements with this brand ID, then filter for visible one
      const allTargets = document.querySelectorAll(`[id^="brand-${brandId}"]`);

      // console.log(
      //   `📋 Found ${allTargets.length} elements matching brand-${brandId}`
      // );

      let target = null;

      // Find the VISIBLE element
      allTargets.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        const isVisible =
          rect.height > 0 &&
          computedStyle.display !== "none" &&
          computedStyle.visibility !== "hidden";

        // console.log(`  Element ${index} (${el.id}):`, {
        //   height: rect.height,
        //   display: computedStyle.display,
        //   visibility: computedStyle.visibility,
        //   isVisible,
        //   device: el.dataset.device,
        // });

        // Check if parent container is ACTUALLY visible (not just has 'hidden' class)
        let parentVisible = true;
        let parent = el.parentElement;
        let depth = 0;

        while (parent && depth < 10) {
          const parentStyle = window.getComputedStyle(parent);
          const parentClasses = parent.className || "";

          // ✅ FIX: Check COMPUTED style, not just class names
          // Responsive classes like 'lg:hidden' may have 'hidden' in name but display: block on mobile
          if (
            parentStyle.display === "none" ||
            parentStyle.visibility === "hidden"
          ) {
            parentVisible = false;
            console.log(`    ❌ Parent ACTUALLY hidden at depth ${depth}:`, {
              class: parent.className,
              computedDisplay: parentStyle.display,
              computedVisibility: parentStyle.visibility,
            });
            break;
          }
          parent = parent.parentElement;
          depth++;
        }

        // Select this element if it's visible and parent is visible
        if (isVisible && parentVisible && !target) {
          target = el;
          console.log(`  ✅ Selected visible element: ${el.id}`);
        }
      });

      if (!target) {
        console.error(`❌ No visible element found for brand-${brandId}`);
        return;
      }

      scrollToElement(target, brandId);
    }, 100);
  };

  // ✅ Separate function to handle actual scrolling
  const scrollToElement = (target, brandId) => {
    const isMobile = window.innerWidth <= 768;

    console.log(`✅ Scrolling to element: ${target.id}`);

    // Check if element has dimensions
    const rect = target.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(target);

    // console.log(`📊 Element metrics:`, {
    //   width: rect.width,
    //   height: rect.height,
    //   top: rect.top,
    //   display: computedStyle.display,
    //   visibility: computedStyle.visibility,
    //   offsetHeight: target.offsetHeight,
    // });

    // ✅ REMOVED: Duplicate parent visibility check
    // The element was already validated in scrollToSection()

    // Get scroll container
    const containerId = isMobile
      ? "main-scroll-container-mobile"
      : "main-scroll-container-desktop";

    const scrollContainer = document.getElementById(containerId);

    if (!scrollContainer) {
      console.error(`❌ Scroll container ${containerId} not found`);
      // Fallback to window scroll
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      return;
    }

    // console.log(`📦 Scroll container:`, {
    //   id: containerId,
    //   scrollTop: scrollContainer.scrollTop,
    //   scrollHeight: scrollContainer.scrollHeight,
    //   clientHeight: scrollContainer.clientHeight,
    // });

    // Calculate position relative to scroll container
    const containerRect = scrollContainer.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Current scroll position + element position relative to viewport - container position
    const targetScrollTop =
      scrollContainer.scrollTop + (targetRect.top - containerRect.top);

    // Account for header offset
    const headerOffset = isMobile ? 80 : 120;

    // ✅ FIX: Handle negative scroll positions (element above viewport)
    let finalScrollTop;
    if (targetScrollTop < 0) {
      // Element is above current view, scroll up
      finalScrollTop = Math.max(
        0,
        scrollContainer.scrollTop + targetScrollTop - headerOffset
      );
    } else {
      // Element is below, scroll down
      finalScrollTop = Math.max(0, targetScrollTop - headerOffset);
    }

    // console.log(`📍 Scroll calculation:`, {
    //   containerTop: containerRect.top,
    //   targetTop: targetRect.top,
    //   currentScroll: scrollContainer.scrollTop,
    //   targetScrollTop,
    //   headerOffset,
    //   finalScrollTop,
    // });

    // Perform scroll
    scrollContainer.scrollTo({
      top: finalScrollTop,
      behavior: "smooth",
    });

    console.log(`✅ Scroll command executed to position: ${finalScrollTop}`);

    // Visual feedback
    setTimeout(() => {
      addVisualFeedback(target);
      setActiveSection(brandId);
    }, 100);
  };

  const registerSection = (brandId, element) => {
    if (!element || !brandId) {
      console.warn(
        `⚠️ Cannot register: brandId=${brandId}, element=${!!element}`
      );
      return;
    }

    const screenWidth = window.innerWidth;
    const isMobile = screenWidth <= 768;
    const deviceType = element.dataset?.device;

    // Register for correct device
    if (
      (isMobile && deviceType === "mobile") ||
      (!isMobile && deviceType === "desktop")
    ) {
      sectionRefs.current[brandId] = element;
      // console.log(`✅ Registered section: ${brandId} (${deviceType})`);
    } else {
      console.log(
        `⏭️ Skipped registration: ${brandId} (wrong device: ${deviceType})`
      );
    }
  };

  const addVisualFeedback = (target) => {
    if (!target) return;

    target.style.transition = "all 0.3s ease";
    target.style.border = "2px solid #ef4444";
    target.style.boxShadow = "0 0 15px rgba(239, 68, 68, 0.5)";

    setTimeout(() => {
      target.style.border = "none";
      target.style.boxShadow = "none";
    }, 600);
  };

  return (
    <ScrollContext.Provider
      value={{
        scrollToSection,
        registerSection,
        activeSection,
        sectionRefs,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};