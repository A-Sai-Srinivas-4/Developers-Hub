import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Data from "../Json/jsonData.json";
import EmployeeCard from "../EmployeeCard";
import "./index.css";

const DeveloperData = () => {
  const [search, setSearch] = useState("");
  const [devList, setDevList] = useState([]);

  useEffect(() => {
    setDevList(Data);
  }, [search]);

  const renderSearchSection = () => (
    <div className="search-container">
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="search"
        placeholder="Search"
      />
    </div>
  );

  const renderDevList = () => (
    <ul className="dev-cards-list">
      {devList
        .filter((each) =>
          each.Name.toLowerCase().includes(search.toLowerCase())
        )
        .map((eachCard) => (
          <EmployeeCard cardDetails={eachCard} key={eachCard.id} />
        ))}
    </ul>
  );

  const showDevDetailsByRole = (event) => {
    const myArray = [];
    Data.map(
      (each) => each.Role === event.target.value && [myArray.push(each)]
    );
    myArray.forEach((element) => {
      setDevList(myArray);
    });
  };

  const roleDropdown = () => {
    const roleDetails = [...new Set(Data.map((e) => e.Role))];

    //console.log(roleDetails)

    return (
      <Dropdown>
        <div className="roles-clear-container">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Role
          </Dropdown.Toggle>
          <button className="clear-btn" onClick={() => setDevList(Data)}>
            Clear
          </button>
        </div>

        <Dropdown.Menu>
          {roleDetails.map((e) => {
            return (
              <div>
                <input
                  type="button"
                  className="role-option"
                  name="Role"
                  value={e}
                  onClick={showDevDetailsByRole}
                />
              </div>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <>
      <div className="dev-display-container">
        {roleDropdown()}
        <div>{renderSearchSection()}</div>
      </div>

      {renderDevList()}
    </>
  );
};

export default DeveloperData;
