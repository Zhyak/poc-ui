import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ICustomCollapse {
  elemId: number;
  title: string;
  subtitle: string;
}

const CustomCollapse = (element: ICustomCollapse) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="flex justify-between mx-2 mt-2 border border-[#D6DDF6] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        navigate(`${element.title.toLowerCase()}`);
      }}
    >
      <div>
        <p className="p-2 text-lg font-bold">{element.title}</p>

        <p className="p-2">{element.subtitle}</p>
      </div>
      <div className="flex items-center">
        {isHovered ? (
          <div className="mr-16">
            <button className="p-2">
              <EditIcon sx={{ color: "#000" }} />
            </button>
            <button className="p-2">
              <DeleteIcon sx={{ color: "#C60000" }} />
            </button>
          </div>
        ) : (
          ""
        )}
        <ChevronRightIcon className="mr-2" fontSize="large" />
      </div>
    </div>
  );
};

export default CustomCollapse;
