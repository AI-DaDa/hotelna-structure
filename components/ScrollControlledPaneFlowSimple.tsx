import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MyPaneFlowComplete from '../app/_components/MyPaneFlowComplete';

gsap.registerPlugin(ScrollTrigger);

interface MyPaneFlowHandle {
  setPane: (index: number) => void;
  nextPane: () => void;
  prevPane: () => void;
  currentPaneIndex: number;
}

const ScrollControlledPaneFlow: React.FC = () => {
  const paneFlowRef = useRef<MyPaneFlowHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalPanes = 8; // Total number of panes in PaneFlow

  useEffect(() => {
    if (!containerRef.current) return;

    let currentPane = 0;

    console.log('Setting up ScrollTrigger for PaneFlow');

    // Calculate responsive start position based on screen size
    const getResponsiveStartPosition = () => {
      const width = window.innerWidth;

      // Extra small mobile devices (portrait phones, less than 576px)
      if (width < 576) {
        return "top center+=200px";
      }
      // Small mobile devices (landscape phones, 576px and up)
      else if (width >= 576 && width < 768) {
        return "top center+=175px";
      }
      // Medium devices (tablets, 768px and up)
      else if (width >= 768 && width < 992) {
        return "top center+=125px";
      }
      // Large devices (desktops, 992px and up)
      else if (width >= 992 && width < 1200) {
        return "top center+=75px";
      }
      // Extra large devices (large desktops, 1200px and up)
      else {
        return "center center";
      }
    };

    // Calculate responsive end position
    const getResponsiveEndPosition = () => {
      const width = window.innerWidth;

      if (width < 768) {
        return "bottom top+=50px"; // Mobile: shorter end distance
      } else if (width >= 768 && width < 1200) {
        return "bottom top+=75px"; // Tablet: moderate end distance
      } else {
        return "bottom top+=100px"; // Desktop: standard end distance
      }
    };

    // Calculate responsive scrub value
    const getResponsiveScrub = () => {
      const width = window.innerWidth;

      if (width < 576) {
        return 2; // Faster on very small screens
      } else if (width < 768) {
        return 2.5; // Slightly faster on mobile
      } else {
        return 3; // Standard speed on larger screens
      }
    };

    // Create scroll trigger that controls pane transitions
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: getResponsiveStartPosition(),
      end: getResponsiveEndPosition(),
      scrub: getResponsiveScrub(),
      markers: false, // Hide start/end markers
      onUpdate: (self) => {
        // Calculate which pane should be active based on scroll progress
        const progress = self.progress;
        const targetPane = Math.floor(progress * totalPanes);
        const clampedPane = Math.min(Math.max(targetPane, 0), totalPanes - 1);

        console.log(`ScrollTrigger progress: ${progress.toFixed(3)}, targetPane: ${targetPane}, clampedPane: ${clampedPane}, currentPane: ${currentPane}`);

        // Only switch panes when the target pane changes
        if (clampedPane !== currentPane && paneFlowRef.current) {
          currentPane = clampedPane;
          paneFlowRef.current.setPane(clampedPane);
        }
      },

    });

    // Enhanced window resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Refresh scroll trigger with new responsive values
        scrollTrigger.kill();

        // Recreate with new responsive values
        const newScrollTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: getResponsiveStartPosition(),
          end: getResponsiveEndPosition(),
          scrub: getResponsiveScrub(),
          markers: false,
          onUpdate: (self) => {
            const progress = self.progress;
            const targetPane = Math.floor(progress * totalPanes);
            const clampedPane = Math.min(Math.max(targetPane, 0), totalPanes - 1);

            if (clampedPane !== currentPane && paneFlowRef.current) {
              currentPane = clampedPane;
              paneFlowRef.current.setPane(clampedPane);
            }
          },
        });

        // Update reference
        Object.assign(scrollTrigger, newScrollTrigger);
      }, 150); // Debounce resize events
    };

    // Add both resize and orientation change listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      scrollTrigger.kill();
    };
  }, [totalPanes]);

  // State for responsive scroll height to prevent hydration mismatch
  const [scrollHeight, setScrollHeight] = useState('300vh');

  // Effect to set responsive scroll height after hydration
  useEffect(() => {
    const updateScrollHeight = () => {
      if (typeof window === 'undefined') return;

      const width = window.innerWidth;
      let newHeight = '300vh'; // Default

      if (width < 576) {
        newHeight = '250vh'; // Shorter scroll on very small screens
      } else if (width < 768) {
        newHeight = '275vh'; // Moderate scroll on mobile
      } else if (width < 1200) {
        newHeight = '300vh'; // Standard scroll on tablets
      } else {
        newHeight = '350vh'; // Longer scroll on large screens
      }

      setScrollHeight(newHeight);
    };

    // Set initial height after component mounts (client-side only)
    updateScrollHeight();

    // Update on resize
    const handleResize = () => {
      updateScrollHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: scrollHeight }} // Hydration-safe responsive scroll area
    >
      <div
        className="sticky top-0 w-full  overflow-hidden"

      >
        <div className="w-full h-full">
          <MyPaneFlowComplete ref={paneFlowRef} />
        </div>

      </div>

    </div>
  );
};

export default ScrollControlledPaneFlow;
