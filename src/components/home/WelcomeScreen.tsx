"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, Fragment } from "react";
import styles from "./home.module.css";
import ResponsiveAppBar from "../header/AppBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { getUsers } from "@/services/api";
import { getStorageData } from "@/services/userStorage";

const WelcomeScreen = () => {
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [users, setUsers] = useState([]);

  const handleClickPopover: any = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
    const { jwt } = getStorageData();
    const { data: userData } = await getUsers(jwt);
    setUsers(userData.users);

    console.log("userData>>>", userData.users);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [searchValue, setSearchValue] = useState<string>();
  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.push("/signin", { scroll: false });
    }
  }, [auth.isLoggedIn]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    setSearchValue("");
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className={styles.mainContainer}>
        <div className={styles.userListSection}>
          <div className={styles.chatTitleSection}>
            <h3>Chats</h3>
            <div className={styles.iconWrapper} onClick={handleClickPopover}>
              <PersonAddAltIcon />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              size="small"
              variant="outlined"
              onChange={handleChange}
              style={{ width: "90%", marginTop: "8px" }}
              value={searchValue}
              InputProps={{
                endAdornment: searchValue ? (
                  <InputAdornment
                    style={{ cursor: "pointer" }}
                    position="end"
                    onClick={handleClick}
                  >
                    <ClearIcon />
                  </InputAdornment>
                ) : (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>

        <div className={styles.chatBodySection}>body</div>
        {/* <div className={styles.heroContainer}>
          <img
            src="/assets/images/chat_logo.png"
            height={"auto"}
            width={"auto"}
            alt="Your Name"
          />
        </div> */}

        <Popover
          id={Boolean(anchorEl) ? "simple-popover" : undefined}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          {users.length > 0 ? (
            <div className={styles.addNewListContainer}>
              <List>
                {users.map((user: any) => (
                  <Fragment key={user.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          alt={`${user.firstName} ${user.lastName}`}
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                      />
                    </ListItem>
                  </Fragment>
                ))}
              </List>
            </div>
          ) : null}
        </Popover>
      </div>
    </>
  );
};

export default WelcomeScreen;
