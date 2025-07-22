"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import History from "../History/History";
import Library from "../Library/Library";
import Plugins from "../Plugins/Plugins";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import Auth from "../Auth/Auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuthState } from "@/store/authSlice";
import { useDisclosure } from "@nextui-org/modal";
import { getStripe } from "@/lib/stripe-client";

import Logo from "../../../public/Logo.svg";
import Menu from "../../../public/svgs/Menu.svg";
import Pen from "../../../public/svgs/Pen.svg";
import Chat from "../../../public/svgs/sidebar/Chat_Active.svg";
import ChatInactive from "../../../public/svgs/sidebar/Chat_Inactive.svg";
import Folder from "../../../public/svgs/sidebar/Folder_Active.svg";
import FolderInactive from "../../../public/svgs/sidebar/Folder_Inactive.svg";
import Setting from "../../../public/svgs/sidebar/Setting_Active.svg";
import SettingInactive from "../../../public/svgs/sidebar/Setting_Inactive.svg";
import Plugin from "../../../public/svgs/sidebar/Plugin_Active.svg";
import PluginInactive from "../../../public/svgs/sidebar/Plugin_Inactive.svg";
import User from "../../../public/svgs/sidebar/User.svg";
import Collapse from "../../../public/svgs/sidebar/Collapse.svg";

const Sidebar = () => {
  const router = useRouter();
  const authState = useSelector(selectAuthState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = useState("history");
  
  const handleCheckout = async () => {
    try {
      console.log('Initiating checkout...');
      
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        console.error('Not in browser environment');
        return;
      }
      
      // Check if Stripe is properly loaded
      if (!window.Stripe) {
        console.error('Stripe.js has not loaded yet');
        return;
      }
      
      // Make the API request
      const res = await fetch('/api/checkout_sessions', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', res.status, errorText);
        return;
      }
      
      const data = await res.json();
      console.log('Checkout session created:', data);
      
      if (!data.id) {
        console.error('No session ID in response:', data);
        return;
      }
      
      // Initialize Stripe
      const stripe = await getStripe();
      if (!stripe) {
        console.error('Failed to initialize Stripe');
        return;
      }
      
      // Redirect to Stripe Checkout
      console.log('Redirecting to Stripe Checkout...');
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      
      if (error) {
        console.error('Stripe redirect error:', error);
      }
      
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const [width, setWidth] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(width >= 512);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    if (width <= 512) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, width, setIsSidebarOpen]);

  useEffect(() => {
    if (!authState) {
      setSelected("history");
    }
  }, [authState]);

  const closeSidebar = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsSidebarOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      closeSidebar();
    } else {
      setIsSidebarOpen(true);
      setIsClosing(false);
    }
  };

  const handleProfileClick = () => {
    if (authState) {
      setSelected("profile");
    } else {
      closeSidebar();
      onOpen();
    }
  };

  const handleNewChat = () => {
    router.push("/");
  };

  return (
    <>
      <div className={styles.header}>
        <div onClick={toggleSidebar} className={styles.menu}>
          <Image priority={true} src={Menu} alt="Menu" width={24} height={24} />
        </div>
        <div className={styles.headerButtons} style={{ opacity: isSidebarOpen ? 0 : 1 }}>
          <div
            className={`${styles.titleButton} ${styles.newChatButton}`}
            onClick={handleNewChat}
          >
            <Image
              priority={true}
              src={Pen}
              alt={"New Chat"}
              width={20}
              height={20}
              className={styles.titleButtonIcon}
            />
            <p className={styles.titleButtonText}>New Chat</p>
          </div>
          <div
            className={`${styles.titleButton} ${styles.upgradeButton}`}
            onClick={handleCheckout}
          >
            <p className={styles.titleButtonText}>Upgrade</p>
          </div>
        </div>
      </div>
      {isSidebarOpen && (
        <>
          <div
            ref={sidebarRef}
            className={`${styles.container} ${
              isSidebarOpen && !isClosing ? styles.opening : ""
            } ${isClosing ? styles.closing : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.barContainer}>
              <Image src={Logo} alt="Logo" className={styles.logo} />
              <div className={styles.iconContainer}>
                <div>
                  {selected === "history" ? (
                    <Image
                      src={Chat}
                      alt="History"
                      className={styles.iconActive}
                    />
                  ) : (
                    <Image
                      src={ChatInactive}
                      alt="History"
                      className={styles.icon}
                      onClick={() => setSelected("history")}
                    />
                  )}
                  {selected === "library" ? (
                    <Image
                      src={Folder}
                      alt="Library"
                      className={styles.iconActive}
                    />
                  ) : (
                    <Image
                      src={FolderInactive}
                      alt="Library"
                      className={styles.icon}
                      onClick={() => setSelected("library")}
                    />
                  )}
                  {selected === "settings" ? (
                    <Image
                      src={Setting}
                      alt="Settings"
                      className={styles.iconActive}
                    />
                  ) : (
                    <Image
                      src={SettingInactive}
                      alt="Settings"
                      className={styles.icon}
                      onClick={() => setSelected("settings")}
                    />
                  )}
                  {selected === "plugins" ? (
                    <Image
                      src={Plugin}
                      alt="Plugins"
                      className={styles.iconActive}
                    />
                  ) : (
                    <Image
                      src={PluginInactive}
                      alt="Plugins"
                      className={styles.icon}
                      onClick={() => setSelected("plugins")}
                    />
                  )}
                </div>
                <div>
                  <Image
                    src={Collapse}
                    alt="Collapse"
                    className={styles.icon}
                    onClick={closeSidebar}
                  />
                  <Image
                    src={User}
                    alt="Profile"
                    className={
                      selected === "profile" ? styles.iconActive : styles.icon
                    }
                    style={{ marginBottom: 0 }}
                    onClick={handleProfileClick}
                  />
                </div>
              </div>
            </div>
            <div className={styles.mainContainer}>
              {selected === "history" ? (
                <History />
              ) : selected === "library" ? (
                <Library />
              ) : selected === "settings" ? (
                <Settings />
              ) : selected === "plugins" ? (
                <Plugins />
              ) : (
                <Profile close={closeSidebar} />
              )}
            </div>
          </div>
          {width <= 512 && (
            <div
              className={`${styles.mobileOverlay} ${
                isClosing ? styles.mobileOverlayClosing : null
              }`}
            />
          )}
        </>
      )}
      <Auth isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
