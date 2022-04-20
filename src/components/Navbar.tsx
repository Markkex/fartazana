import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import fartazanaLogo from "../assets/jpg/Fartazana-logo.png";
import { useTranslation } from "react-i18next";
import {
  Container,
  AppBar,
  Toolbar,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { t, i18n } = useTranslation();
  const language = useSelector((state: any) => state.user.language);
  const user = useSelector((state: any) => state.user.user);

  const languagesAvalilable = [
    { language: "PT", value: "pt" },
    { language: "EN", value: "en" },
  ];

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <AppBar>
        <Container>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <div
                className="logo-image pointer"
                onClick={() => navigate(`/explore/`)}
              >
                <img className="logo-navbar" src={fartazanaLogo} alt="logo" />
              </div>
            </Box>
            <Box>
              <div
                className="menu-options"
                style={{ display: "flex", alignItems: "center" }}
              >
                {user && (
                  <>
                    <p className="pointer" onClick={() => navigate(`/profile`)}>
                      {auth.currentUser?.displayName}
                    </p>
                    <p className="pointer">
                      <ShoppingCartIcon />
                    </p>
                  </>
                )}
                <FormControl>
                  <Select defaultValue={language}>
                    {languagesAvalilable.map((languageAvailable) => (
                      <MenuItem
                        value={languageAvailable.value}
                        onClick={() => changeLanguage(languageAvailable.value)}
                      >
                        {languageAvailable.language}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="navbar"></div>
    </>
  );
};

export default Navbar;
