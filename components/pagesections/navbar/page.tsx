"use client"; // Required for client-side interactivity

import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { logout } from "@/firebase";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // Listen to authentication state changes
  useEffect(() => {
    if (!auth) {
      console.warn("Firebase auth is not initialized.");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User:", currentUser); // Debug log
      setUser(currentUser);
      if (currentUser) {
        setProfilePic(currentUser.photoURL);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push("/");
  };

  const getInitial = (name?: string | null) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light custom-navbar border-bottom"
      style={{
        zIndex: 1000,
        position: "fixed",
        left: 0,
        right: 0,
        backgroundColor: "#fff",
      }}
    >
      <div className=" flex container-fluid">
        <Link className=" flex navbar-brand ms-1 tw-flex tw-items-center" href="/">
          <Image
            src="/images/qrlogo.png"
            alt="logo"
            width={40}
            height={40}
            style={{ width: "40px", height: "auto" }}
          />
          <span className=" p-1 tw-ml-2">QRGen</span>
        </Link>

        <button
          className="navbar-toggler rounded-0 tw-mr-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav my-3 ms-3">
            {/* Add other navbar items here */}
          </ul>

          {/* Conditional rendering based on auth state */}
          <div className="d-lg-flex ms-auto tw-mr-3">
            {user ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  className="profile-dropdown"
                >
                  {profilePic ? (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="profile-tooltip">
                          {user.displayName || "No Name"}
                          <br />
                          {user.email}
                        </Tooltip>
                      }
                    >
                      <img
                        src={profilePic || "images/qrcode.png"}
                        alt="User Profile"
                        className="profile-pic"
                      />
                    </OverlayTrigger>
                  ) : (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="profile-tooltip">
                          {user.displayName || "No Name"}
                          <br />
                          {user.email}
                        </Tooltip>
                      }
                    >
                      <div className="profile-initial">
                        {getInitial(user.displayName || user.email)}
                      </div>
                    </OverlayTrigger>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu align="end">
                  <Dropdown.Item>
                    <div className="truncate-name">
                      <strong>{user.displayName || user.email}</strong>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} href="/userpage">
                    My Account
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="outline-secondary" className="me-2 rounded-0">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" passHref>
                  <Button variant="secondary" className="rounded-0 signupBtn">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
