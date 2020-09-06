import React from "react";
import Tour from "reactour";
import { useHistory, useLocation } from "react-router-dom";
import { Typography } from "@material-ui/core";

export default function TutorialTour({ isTourOpen, setIsTourOpen }) {
  const history = useHistory();
  const location = useLocation();
  const accentColor = "#f99746";
  const bodyContainer = document.querySelector("body");

  const closeTour = () => {
    // Enable scrolling again (few steps disable it)
    bodyContainer.style.overflowY = "scroll";
    setIsTourOpen(false);
  };

  const steps = [
    {
      position: [20, 250],
      action: () => {
        if (location.pathname !== "/") {
          history.push("/");
        }
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) {
          nextBtn.style.display = "block";
        }
      },
      selector: '[data-tut="reactour__home"]',
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Start
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            On this platform you can view properties that other people added,
            add your own or edit and delete them.
          </Typography>
        </div>
      ),
    },
    {
      action: () => {
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) {
          nextBtn.style.display = "block";
        }
      },
      selector: '[data-tut="reactour__home_nav"]',
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Navigation
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            On this bar, you can navigate between the Homepage, Add property,
            Profile and Logout.
          </Typography>
        </div>
      ),
    },
    {
      action: () => {
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) {
          nextBtn.style.display = "block";
        }
      },
      selector: '[data-tut="reactour__home_properties"]',
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Latest properties
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            Here you can see the latest properties added by others and some
            details.
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            You can decide if you would want to go there based on the weather!
          </Typography>
        </div>
      ),
    },
    {
      stepInteraction: true,
      action: (node) => {
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) nextBtn.style.display = "none"; // hide nextButton
        node.onclick = () => {
          if (nextBtn) {
            nextBtn.style.display = "block";
            nextBtn.click();
          }
        };
      },
      selector: '[datatut="reactour__home_property"]',
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Property details
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            Click on this property card to see more details.
          </Typography>
        </div>
      ),
    },
    {
      action: () => {
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) {
          nextBtn.style.display = "block";
        }
      },
      selector: '[data-tut="reactour__home_property_details"]',
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Property details
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            Here you can see a more detailed description of the property.
          </Typography>
        </div>
      ),
    },
    {
      stepInteraction: true,
      action: (node) => {
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) nextBtn.style.display = "none"; // hide nextButton
        node.onclick = () => {
          if (nextBtn) {
            nextBtn.style.display = "block";
            nextBtn.click();
          }
        };
      },
      selector: '[datatut="reactour__profile"]',
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Your profile
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            Click on My Profile to go to your profile page.
          </Typography>
        </div>
      ),
    },
    {
      action: () => {
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) {
          nextBtn.style.display = "block";
        }
      },
      selector: '[data-tut="reactour__profile_card"]',
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Your profile
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            This is your profile card.
          </Typography>
        </div>
      ),
    },
    {
      action: () => {
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) {
          nextBtn.style.display = "block";
        }
      },
      selector: '[data-tut="reactour__profile_properties"]',
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Your profile
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            Here is where you are able to see the properties that you added.
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            You can also edit or delete them from this page.
          </Typography>
        </div>
      ),
    },
    {
      stepInteraction: true,
      action: (node) => {
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) nextBtn.style.display = "none"; // hide nextButton
        node.onclick = () => {
          if (nextBtn) {
            nextBtn.style.display = "block";
            nextBtn.click();
          }
        };
      },
      selector: '[datatut="reactour__add_property"]',
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Add property
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            To add a new property you have to go on the Add property page.
          </Typography>
          <Typography style={{ marginTop: "5px" }}>Click on this.</Typography>
        </div>
      ),
    },
    {
      action: () => {
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) {
          nextBtn.style.display = "block";
        }
      },
      selector: '[data-tut="reactour__add_property_form"]',
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Add property
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            When you add a new property, you have to fill in all the inputs so
            the everybody knows everything necessary about it.
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            Don't forget to add a picture!
          </Typography>
        </div>
      ),
    },
    {
      action: () => {
        const nextBtn = document.getElementById("_tour_next_btn");
        if (nextBtn) {
          nextBtn.style.display = "block";
        }
      },
      content: () => (
        <div>
          <Typography variant="h5" style={{ color: "#f99746" }}>
            Finish
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            And that is all you need to know about the platform.
          </Typography>
          <Typography style={{ marginTop: "5px" }}>
            You are ready to interact on your own.
          </Typography>
          <Typography style={{ marginTop: "5px" }}>Happy browsing!</Typography>
        </div>
      ),
    },
  ];

  return (
    <Tour
      onRequestClose={closeTour}
      rounded={5}
      steps={steps}
      isOpen={isTourOpen}
      accentColor={accentColor}
      disableInteraction
      closeWithMask={false}
      showNavigation={false}
      prevButton={
        <button id="_tour_prev_btn" style={{ display: "none" }}>
          Prev
        </button>
      }
      startAt={0}
      nextButton={
        <button
          id="_tour_next_btn"
          style={{
            border: "none",
            backgroundColor: "#f99746",
            color: "white",
            padding: "0.7em 1em",
            borderRadius: "5px",
            position: "absolute",
            right: "2em",
            bottom: "1.5em",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Next
        </button>
      }
      lastStepNextButton={
        <button
          id="_tour_last_btn"
          style={{
            border: "none",
            backgroundColor: "#f99746",
            color: "white",
            padding: "0.7em 1em",
            borderRadius: "5px",
            position: "absolute",
            right: "2em",
            bottom: "1.2em",
            cursor: "pointer",
          }}
        >
          Done
        </button>
      }
    />
  );
}
