import { useEffect, useState } from "react";
import "./PremixCosting.css";

function PremixCosting({
  onCostChange,
  manufacturingExpenses,
}) {
  const [materials, setMaterials] = useState([
    {
      name: "Charcoal",
      price: 22.4,
      percentage: 42,
    },
    {
      name: "Joss Powder",
      price: 97.9,
      percentage: 18,
    },
    {
      name: "Saw Dust",
      price: 28.3,
      percentage: 40,
    },
  ]);

  const [wastage, setWastage] = useState(3);

  const dryingBlendingCost =
    manufacturingExpenses?.drying ?? 1.67;

  const updatedMaterials = materials.map((material) => ({
    ...material,
    cost:
      (Number(material.price) *
        Number(material.percentage)) /
      100,
  }));

  const totalMaterialCost =
    updatedMaterials.reduce(
      (total, material) =>
        total + material.cost,
      0
    );

  const costBeforeWastage =
    totalMaterialCost +
    Number(dryingBlendingCost);

  const finalPremixCost =
    costBeforeWastage *
    (1 + Number(wastage) / 100);

  useEffect(() => {
    onCostChange(finalPremixCost);
  }, [
    finalPremixCost,
    onCostChange,
  ]);

  const totalPercentage =
    materials.reduce(
      (total, material) =>
        total +
        Number(material.percentage),
      0
    );

  const updateMaterial = (
    index,
    field,
    value
  ) => {
    const newMaterials = [...materials];

    if (field === "name") {
      newMaterials[index][field] = value;
    } else {
      newMaterials[index][field] =
        Number(value);
    }

    setMaterials(newMaterials);
  };

  const addMaterial = () => {
    setMaterials([
      ...materials,
      {
        name: "New Material",
        price: 0,
        percentage: 0,
      },
    ]);
  };

  const removeMaterial = (index) => {
    const newMaterials =
      materials.filter(
        (_, i) => i !== index
      );

    setMaterials(newMaterials);
  };

  const isValidPercentage =
    totalPercentage === 100;

  return (
    <div className="premix-module">

      {/* =================================
          MODULE HEADER
      ================================= */}

      <div className="premix-module-header">

        <div className="premix-title-area">

          <div className="premix-title-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 8h14" />
              <path d="M7 8v11h10V8" />
              <path d="M9 5h6v3H9z" />
              <path d="M9 12h6" />
              <path d="M9 15h4" />
            </svg>
          </div>

          <div>
            <span className="module-label">
              STEP 02 · RAW MATERIAL MIX
            </span>

            <h2>Premix Costing</h2>

            <p>
              Calculate the material and labour cost
              required to produce 1 kg of premix.
            </p>
          </div>

        </div>

        <button
          className="premix-add-button"
          onClick={addMaterial}
        >
          <span>+</span>
          Add Material
        </button>

      </div>


      {/* =================================
          MATERIAL SECTION
      ================================= */}

      <div className="premix-card">

        <div className="premix-card-header">

          <div>
            <span className="section-number">
              01
            </span>

            <div className="section-title">
              <h3>Raw Materials</h3>

              <p>
                Enter the purchase price and
                percentage used in the premix.
              </p>
            </div>
          </div>

          <div
            className={`percentage-status ${
              isValidPercentage
                ? "valid"
                : "invalid"
            }`}
          >
            <span className="status-dot" />

            {totalPercentage}% Input

            {isValidPercentage
              ? " ✓"
              : " · Required 100%"}
          </div>

        </div>


        {/* MATERIAL TABLE */}

        <div className="material-table">

          <div className="material-table-head">

            <div>Material</div>
            <div>Price / Kg</div>
            <div>Input %</div>
            <div>Contribution</div>
            <div></div>

          </div>


          {updatedMaterials.map(
            (material, index) => (

              <div
                className="material-row"
                key={index}
              >

                <div className="material-name-cell">

                  <div className="material-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <input
                    className="material-name-input"
                    type="text"
                    value={material.name}
                    onChange={(e) =>
                      updateMaterial(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="input-with-symbol">

                  <span>₹</span>

                  <input
                    type="number"
                    step="0.01"
                    value={material.price}
                    onChange={(e) =>
                      updateMaterial(
                        index,
                        "price",
                        e.target.value
                      )
                    }
                  />

                </div>


                <div className="percentage-input">

                  <input
                    type="number"
                    step="0.1"
                    value={material.percentage}
                    onChange={(e) =>
                      updateMaterial(
                        index,
                        "percentage",
                        e.target.value
                      )
                    }
                  />

                  <span>%</span>

                </div>


                <div className="material-cost">

                  <span>₹</span>

                  <strong>
                    {material.cost.toFixed(2)}
                  </strong>

                  <small>/ kg</small>

                </div>


                <button
                  className="material-delete"
                  onClick={() =>
                    removeMaterial(index)
                  }
                  title="Remove material"
                >
                  ×
                </button>

              </div>

            )
          )}


          {/* TABLE TOTAL */}

          <div className="material-total-row">

            <div>
              Total Material Cost
            </div>

            <div></div>

            <div
              className={
                isValidPercentage
                  ? "total-percent-valid"
                  : "total-percent-invalid"
              }
            >
              {totalPercentage}%
            </div>

            <div className="material-total-value">
              ₹{totalMaterialCost.toFixed(2)}
              <small>/ kg</small>
            </div>

            <div></div>

          </div>

        </div>


        {/* WARNING */}

        {!isValidPercentage && (
          <div className="premix-warning">

            <div className="warning-icon">
              !
            </div>

            <div>
              <strong>
                Input percentage must equal 100%
              </strong>

              <span>
                Your current material mix is{" "}
                {totalPercentage}%.
                Adjust the percentages before
                finalising the costing.
              </span>
            </div>

          </div>
        )}

      </div>


      {/* =================================
          COST ADJUSTMENTS
      ================================= */}

      <div className="premix-two-column">

        {/* WASTAGE */}

        <div className="premix-small-card">

          <div className="small-card-icon">
            %
          </div>

          <div className="small-card-content">

            <span>WASTAGE</span>

            <h3>
              Material Wastage
            </h3>

            <p>
              Additional material allowance
              during production.
            </p>

          </div>

          <div className="small-input">

            <input
              type="number"
              step="0.1"
              value={wastage}
              onChange={(e) =>
                setWastage(
                  Number(e.target.value)
                )
              }
            />

            <span>%</span>

          </div>

        </div>


        {/* DRYING LABOUR */}

        <div className="premix-small-card">

          <div className="small-card-icon labour-icon">
            ₹
          </div>

          <div className="small-card-content">

            <span>MANUFACTURING EXPENSE</span>

            <h3>
              Drying & Blending Labour
            </h3>

            <p>
              Cost is managed from Manufacturing
              Expenses.
            </p>

          </div>

          <div className="managed-cost">

            <strong>
              ₹
              {Number(
                dryingBlendingCost
              ).toFixed(2)}
            </strong>

            <span>/ kg</span>

          </div>

        </div>

      </div>


      {/* =================================
          CALCULATION BREAKDOWN
      ================================= */}

      <div className="premix-calculation-card">

        <div className="calculation-heading">

          <div className="calculation-icon">
            =
          </div>

          <div>
            <h3>
              Cost Calculation
            </h3>

            <p>
              How the final premix cost is calculated
            </p>
          </div>

        </div>


        <div className="calculation-flow">

          <div className="flow-box">

            <span>
              MATERIAL COST
            </span>

            <strong>
              ₹{totalMaterialCost.toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>


          <div className="flow-plus">
            +
          </div>


          <div className="flow-box">

            <span>
              DRYING & BLENDING
            </span>

            <strong>
              ₹
              {Number(
                dryingBlendingCost
              ).toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>


          <div className="flow-plus">
            +
          </div>


          <div className="flow-box">

            <span>
              WASTAGE
            </span>

            <strong>
              {wastage}%
            </strong>

            <small>
              allowance
            </small>

          </div>


          <div className="flow-equals">
            =
          </div>


          <div className="flow-final">

            <span>
              FINAL PREMIX COST
            </span>

            <strong>
              ₹{finalPremixCost.toFixed(2)}
            </strong>

            <small>
              per kg
            </small>

          </div>

        </div>


        {/* FORMULA */}

        <div className="formula-line">

          <span>
            ({totalMaterialCost.toFixed(2)} +{" "}
            {Number(
              dryingBlendingCost
            ).toFixed(2)})
          </span>

          <span>×</span>

          <span>
            (1 + {wastage}%)
          </span>

          <span>=</span>

          <strong>
            ₹{finalPremixCost.toFixed(2)} / kg
          </strong>

        </div>

      </div>


      {/* =================================
          FINAL RESULT
      ================================= */}

      <div className="premix-final-result">

        <div className="result-left">

          <div className="result-check">
            ✓
          </div>

          <div>
            <span>
              PREMIX PRODUCTION COST
            </span>

            <h3>
              Final cost for 1 kg of premix
            </h3>
          </div>

        </div>


        <div className="result-price">

          <strong>
            ₹{finalPremixCost.toFixed(2)}
          </strong>

          <span>
            / kg
          </span>

        </div>

      </div>

    </div>
  );
}

export default PremixCosting;