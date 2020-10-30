import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import MessCard from "./MessCard";
import CarouselCard from "./CarouselCard";
// import MessCardData from "./MessCardData";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
// import Fade from "react-reveal/Fade";
import { authAxiosCust } from "../../../App";

const Customer = () => {
  let history = useHistory();
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMenu, setCurrentMenu] = useState([]);

  const searchMess = (data) => {
    setState(data);
  };

  useEffect(() => {
    setLoading(true);
    authAxiosCust
      .get("api/mess/all")
      .then((res) => {
        // console.log(res.data.Mess);
        setState(res.data.Mess);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(`${err}:some error while fetching mess-all data`);
      });

    authAxiosCust
      .get("api/currentmenu/all")
      .then((res) => {
        console.log(res);
        // console.log(res.data.availableMenus);
        setCurrentMenu(res.data.availableMenus);
        setLoading(false);
      })
      .catch((err) => {
        console.log(`${err}:some error while fetching current menu data`);
      });
  }, []);

  return (
    <>
      {!localStorage.getItem("token") ? (
        (history.push("/login/customer"))
      ) : (
        <div>
          <NavBar searchMess={searchMess} />

          <header className=" mt-3">
            <div className="container">
              <div
                id="carouselExampleControls"
                className="carousel slide mx-5"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  {currentMenu.slice(0, 1).map((messInfo) => {
                    return (
                      <div
                        className="carousel-item active"
                        key={messInfo.menu._id}
                      >
                        <CarouselCard
                          menuItem={messInfo.menu.menuItem}
                          menuName={messInfo.menu.menuName}
                          price={messInfo.menu.price}
                          mess={messInfo.messDetails.messName}
                          address={messInfo.messDetails.address}
                          messId={messInfo.identification.messId}
                        />
                      </div>
                    );
                  })}

                  {currentMenu.slice(1).map((messInfo) => {
                    return (
                      <div className="carousel-item" key={messInfo.menu._id}>
                        <CarouselCard
                          menuItem={messInfo.menu.menuItem}
                          menuName={messInfo.menu.menuName}
                          price={messInfo.menu.price}
                          mess={messInfo.messDetails.messName}
                          address={messInfo.messDetails.address}
                          messId={messInfo.identification.messId}
                        />
                      </div>
                    );
                  })}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  style={{ width: "10%" }}
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    style={{
                      filter: "invert(1)",
                      width: "45px",
                      height: "26px",
                    }}
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next "
                  style={{ width: "10%" }}
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    style={{
                      filter: "invert(1)",
                      width: "45px",
                      height: "26px",
                    }}
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </header>

          <div className="my-5">
            <div className="container-fluid d-flex">
              <div className="row">
                <div className="col-10 mx-auto">
                  <div className="row justify-content-center pt-2">
                    {loading ? (
                      <Loader
                        type="ThreeDots"
                        color="#FFB800"
                        height="100"
                        width="100"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    ) : (
                      state.map((item) => {
                        return (
                          /* <Fade bottom key={item._id}> */
                          <MessCard
                            key={item._id}
                            messImg={item.messDetails.messImg}
                            messName={item.messDetails.messName}
                            messAdd={item.messDetails.address}
                            messId={item._id}
                          />
                          /* </Fade> */
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Customer;
