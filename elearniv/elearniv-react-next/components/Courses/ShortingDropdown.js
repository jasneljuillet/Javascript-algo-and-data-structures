import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ShortingDropdown = () => {
  const [short, setShort] = useState("");
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    router.push({
      pathname: "/courses",
      query: { ...query, short: short },
    });
  }, [short]);

  return (
    <div className="elearniv-grid-sorting row align-items-center mb-5">
      <div className="col-lg-4 col-md-6 ordering">
        <div className="select-box">
          <select
            className="form-select"
            name="short"
            value={short}
            onChange={(e) => setShort(e.target.value)}
          >
            <option value="">Trier par</option>
            <option value="ASC">Nouveau</option>
            <option value="DESC">Ancien</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ShortingDropdown;
