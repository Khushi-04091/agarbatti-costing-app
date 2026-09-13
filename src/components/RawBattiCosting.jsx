import { useEffect, useState } from "react";
import "./RawBattiCosting.css";

function RawBattiCosting({
  premixCost,
  onCostChange,
  manufacturingExpenses,
}) {
  const [bambooCost, setBambooCost] = useState(146);
  const [bambooPercentage, setBambooPercentage] = useState(30);
  const [bambooRejection, setBambooRejection] = useState(3);

  const [premixPercentage, setPremixPercentage] = useState(70);
  const [wastage, setWastage] = useState(2);

  const extrusionLabour =
    manufacturingExpenses?.extrusion ?? 5;

  const sortingLabour =
    manufacturingExpenses?.sorting ?? 1;

  const powerCost =
    manufacturingExpenses?.power ?? 1.13;

  const maintenanceCost =
    manufacturingExpenses?.maintenance ?? 2.15;

  const transportationCost =
    manufacturingExpenses?.transportation ?? 2;

  const overheadCost =
    manufacturingExpenses?.overhead ?? 2;

  // Bamboo cost after rejection
  const bambooCostAfterRejection =
    bambooCost * (1 + bambooRejection / 100);

  // Material contribution
  const bambooContribution =
    bambooCostAfterRejection *
    (bambooPercentage / 100);

  const premixContribution =
    premixCost *
    (premixPercentage / 100);

  const materialCost =
    bambooContribution + premixContribution;

  // Manufacturing expenses
  const totalManufacturingExpenses =
    extrusionLabour +
    sortingLabour +
    powerCost +
    maintenanceCost +
    transportationCost +
    overheadCost;

  // Cost before wastage
  const costBeforeWastage =
    materialCost + totalManufacturingExpenses;

  // Final cost
  const finalRawBattiCost =
    costBeforeWastage *
    (1 + wastage / 100);

  const wastageAmount =
    finalRawBattiCost - costBeforeWastage;

  useEffect(() => {
    if (onCostChange) {
      onCostChange(finalRawBattiCost);
    }
  }, [finalRawBattiCost, onCostChange]);

  const totalMaterialPercentage =
    bambooPercentage + premixPercentage;

  const percentageIsValid =
    totalMaterialPercentage === 100;

  return (
    <section className="raw-batti-module">

      {/* =================================
          HEADER
      ================================= */}

      <div className="raw-module-header">

        <div className="raw-title-area">

          <div className="raw-title-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 18c4-5 8-9 16-13" />
              <path d="M5 20c4-5 8-9 15-12" />
              <path d="M17 4l2 1-1 2" />
            </svg>

          </div>

          <div>

            <span className="raw-module-label">
              STEP 03 · RAW BATTI PRODUCTION
            </span>

            <h2>Raw Batti Costing</h2>

            <p>
              Calculate bamboo, premix and manufacturing
              cost for 1 kg of raw batti.
            </p>

          </div>

        </div>

        <div className="raw-cost-badge">

          <span>PREMIX INPUT</span>

          <strong>
            ₹{Number(premixCost || 0).toFixed(2)}
          </strong>

          <small>/ kg</small>

        </div>

      </div>


      {/* =================================
          RAW MATERIAL CARD
      ================================= */}

      <div className="raw-card">

        <div className="raw-card-header">

          <div className="raw-section-heading">

            <div className="raw-section-number">
              01
            </div>

            <div>

              <h3>Raw Material Mix</h3>

              <p>
                Define bamboo and premix proportions
                used for raw batti production.
              </p>

            </div>

          </div>

          <div
            className={`raw-percentage-status ${
              percentageIsValid
                ? "valid"
                : "invalid"
            }`}
          >
            <span />
            {totalMaterialPercentage}%
            {percentageIsValid
              ? " Mix ✓"
              : " · Required 100%"}
          </div>

        </div>


        {/* INPUT GRID */}

        <div className="raw-input-grid">

          {/* Bamboo Cost */}

          <div className="raw-input-card">

            <label>BAMBOO COST</label>

            <span className="input-description">
              Purchase price
            </span>

            <div className="raw-input-wrapper">

              <span>₹</span>

              <input
                type="number"
                step="0.01"
                value={bambooCost}
                onChange={(e) =>
                  setBambooCost(
                    Number(e.target.value)
                  )
                }
              />

              <small>/ kg</small>

            </div>

          </div>


          {/* Bamboo Percentage */}

          <div className="raw-input-card">

            <label>BAMBOO PROPORTION</label>

            <span className="input-description">
              Share in raw batti
            </span>

            <div className="raw-input-wrapper">

              <input
                type="number"
                step="0.1"
                value={bambooPercentage}
                onChange={(e) =>
                  setBambooPercentage(
                    Number(e.target.value)
                  )
                }
              />

              <small>%</small>

            </div>

          </div>


          {/* Bamboo Rejection */}

          <div className="raw-input-card">

            <label>BAMBOO REJECTION</label>

            <span className="input-description">
              Rejected bamboo allowance
            </span>

            <div className="raw-input-wrapper">

              <input
                type="number"
                step="0.1"
                value={bambooRejection}
                onChange={(e) =>
                  setBambooRejection(
                    Number(e.target.value)
                  )
                }
              />

              <small>%</small>

            </div>

          </div>


          {/* Premix Percentage */}

          <div className="raw-input-card">

            <label>PREMIX PROPORTION</label>

            <span className="input-description">
              Share in raw batti
            </span>

            <div className="raw-input-wrapper">

              <input
                type="number"
                step="0.1"
                value={premixPercentage}
                onChange={(e) =>
                  setPremixPercentage(
                    Number(e.target.value)
                  )
                }
              />

              <small>%</small>

            </div>

          </div>


          {/* Premix Cost */}

          <div className="raw-input-card managed">

            <label>PREMIX COST</label>

            <span className="input-description">
              Automatically from Premix
            </span>

            <div className="managed-value">

              <strong>
                ₹{Number(
                  premixCost || 0
                ).toFixed(2)}
              </strong>

              <small>/ kg</small>

            </div>

          </div>


          {/* Wastage */}

          <div className="raw-input-card">

            <label>RAW BATTI WASTAGE</label>

            <span className="input-description">
              Production wastage
            </span>

            <div className="raw-input-wrapper">

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

              <small>%</small>

            </div>

          </div>

        </div>


        {/* MIX STATUS */}

        {!percentageIsValid && (
          <div className="raw-warning">

            <div>!</div>

            <span>
              Bamboo and premix proportions should
              total 100%. Current total:
              <strong>
                {" "}
                {totalMaterialPercentage}%
              </strong>
            </span>

          </div>
        )}

      </div>


      {/* =================================
          MATERIAL COST
      ================================= */}

      <div className="raw-card">

        <div className="raw-card-header">

          <div className="raw-section-heading">

            <div className="raw-section-number">
              02
            </div>

            <div>

              <h3>Material Cost</h3>

              <p>
                Contribution of bamboo and premix
                to the raw batti cost.
              </p>

            </div>

          </div>

        </div>


        <div className="raw-cost-grid">

          {/* Bamboo */}

          <div className="raw-cost-item">

            <div className="raw-cost-icon bamboo">
              B
            </div>

            <div className="raw-cost-info">

              <span>
                BAMBOO CONTRIBUTION
              </span>

              <strong>
                ₹{bambooContribution.toFixed(2)}
              </strong>

              <small>
                {bambooPercentage}% of material mix
              </small>

            </div>

          </div>


          {/* Plus */}

          <div className="raw-cost-operator">
            +
          </div>


          {/* Premix */}

          <div className="raw-cost-item">

            <div className="raw-cost-icon premix">
              P
            </div>

            <div className="raw-cost-info">

              <span>
                PREMIX CONTRIBUTION
              </span>

              <strong>
                ₹{premixContribution.toFixed(2)}
              </strong>

              <small>
                {premixPercentage}% of material mix
              </small>

            </div>

          </div>


          {/* Equals */}

          <div className="raw-cost-operator">
            =
          </div>


          {/* Total */}

          <div className="raw-material-total">

            <span>
              TOTAL MATERIAL COST
            </span>

            <strong>
              ₹{materialCost.toFixed(2)}
            </strong>

            <small>
              per kg
            </small>

          </div>

        </div>

      </div>


      {/* =================================
          MANUFACTURING EXPENSES
      ================================= */}

      <div className="raw-card">

        <div className="raw-card-header">

          <div className="raw-section-heading">

            <div className="raw-section-number">
              03
            </div>

            <div>

              <h3>
                Manufacturing Expenses
              </h3>

              <p>
                Production expenses managed from
                Manufacturing Expenses.
              </p>

            </div>

          </div>

          <div className="expense-total-badge">

            <span>TOTAL</span>

            <strong>
              ₹
              {totalManufacturingExpenses.toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>

        </div>


        <div className="expense-grid">

          <div className="expense-item">
            <span>EXTRUSION LABOUR</span>
            <strong>
              ₹{extrusionLabour.toFixed(2)}
            </strong>
            <small>/ kg</small>
          </div>

          <div className="expense-item">
            <span>SORTING LABOUR</span>
            <strong>
              ₹{sortingLabour.toFixed(2)}
            </strong>
            <small>/ kg</small>
          </div>

          <div className="expense-item">
            <span>POWER & FUEL</span>
            <strong>
              ₹{powerCost.toFixed(2)}
            </strong>
            <small>/ kg</small>
          </div>

          <div className="expense-item">
            <span>MAINTENANCE</span>
            <strong>
              ₹{maintenanceCost.toFixed(2)}
            </strong>
            <small>/ kg</small>
          </div>

          <div className="expense-item">
            <span>TRANSPORTATION</span>
            <strong>
              ₹{transportationCost.toFixed(2)}
            </strong>
            <small>/ kg</small>
          </div>

          <div className="expense-item">
            <span>OVERHEADS</span>
            <strong>
              ₹{overheadCost.toFixed(2)}
            </strong>
            <small>/ kg</small>
          </div>

        </div>

      </div>


      {/* =================================
          FINAL CALCULATION
      ================================= */}

      <div className="raw-calculation-card">

        <div className="raw-calculation-header">

          <div className="raw-equals-icon">
            =
          </div>

          <div>

            <h3>
              Raw Batti Cost Calculation
            </h3>

            <p>
              Material + manufacturing expenses
              + wastage
            </p>

          </div>

        </div>


        <div className="raw-calculation-flow">

          <div className="raw-flow-box">

            <span>MATERIAL COST</span>

            <strong>
              ₹{materialCost.toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>


          <div className="raw-flow-plus">
            +
          </div>


          <div className="raw-flow-box">

            <span>MANUFACTURING</span>

            <strong>
              ₹
              {totalManufacturingExpenses.toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>


          <div className="raw-flow-plus">
            +
          </div>


          <div className="raw-flow-box">

            <span>WASTAGE</span>

            <strong>
              ₹{wastageAmount.toFixed(2)}
            </strong>

            <small>
              {wastage}% allowance
            </small>

          </div>


          <div className="raw-flow-equals">
            =
          </div>


          <div className="raw-flow-final">

            <span>
              FINAL RAW BATTI COST
            </span>

            <strong>
              ₹{finalRawBattiCost.toFixed(2)}
            </strong>

            <small>
              per kg
            </small>

          </div>

        </div>


        <div className="raw-formula">

          <span>
            ({materialCost.toFixed(2)} +{" "}
            {totalManufacturingExpenses.toFixed(2)})
          </span>

          <span>×</span>

          <span>
            (1 + {wastage}%)
          </span>

          <span>=</span>

          <strong>
            ₹{finalRawBattiCost.toFixed(2)} / kg
          </strong>

        </div>

      </div>


      {/* =================================
          FINAL RESULT
      ================================= */}

      <div className="raw-final-result">

        <div className="raw-result-left">

          <div className="raw-result-check">
            ✓
          </div>

          <div>

            <span>
              RAW BATTI PRODUCTION COST
            </span>

            <h3>
              Final cost for 1 kg of raw batti
            </h3>

          </div>

        </div>


        <div className="raw-result-price">

          <strong>
            ₹{finalRawBattiCost.toFixed(2)}
          </strong>

          <span>
            / kg
          </span>

        </div>

      </div>

    </section>
  );
}

export default RawBattiCosting;