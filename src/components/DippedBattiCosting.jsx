import { useEffect, useState } from "react";
import "./DippedBattiCosting.css";

function DippedBattiCosting({
  rawBattiCost,
  fragranceCost,
  manufacturingExpenses,
  onCostChange,
}) {
  const [fragrancePercentage, setFragrancePercentage] =
    useState(30);

  const dippingLabour =
    manufacturingExpenses?.dipping ?? 0.67;

  const fragranceContribution =
    Number(fragranceCost) *
    (fragrancePercentage / 100);

  const dippedBattiCost =
    Number(rawBattiCost) +
    fragranceContribution +
    Number(dippingLabour);

  const totalBeforeDipping =
    Number(rawBattiCost) +
    fragranceContribution;

  useEffect(() => {
    onCostChange(dippedBattiCost);
  }, [dippedBattiCost, onCostChange]);

  return (
    <section className="dipped-module">

      {/* =================================
          HEADER
      ================================= */}

      <div className="dipped-module-header">

        <div className="dipped-title-area">

          <div className="dipped-title-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18c3-4 6-8 12-12" />
              <path d="M8 20c3-4 6-7 11-10" />
              <path d="M17 5l2 1-1 2" />
              <circle cx="7" cy="18" r="1.5" />
            </svg>

          </div>

          <div>

            <span className="dipped-module-label">
              STEP 05 · FRAGRANCE COATING
            </span>

            <h2>
              Dipped Batti Costing
            </h2>

            <p>
              Combine raw batti, fragrance and dipping
              labour to calculate the final dipped cost.
            </p>

          </div>

        </div>

        <div className="dipped-total-badge">

          <span>FINAL DIPPED BATTI</span>

          <strong>
            ₹{dippedBattiCost.toFixed(2)}
          </strong>

          <small>/ kg</small>

        </div>

      </div>


      {/* =================================
          INPUTS
      ================================= */}

      <div className="dipped-card">

        <div className="dipped-card-header">

          <div className="dipped-section-heading">

            <div className="dipped-section-number">
              01
            </div>

            <div>

              <h3>Production Inputs</h3>

              <p>
                Costs automatically come from the
                previous costing stages.
              </p>

            </div>

          </div>

        </div>


        <div className="dipped-input-grid">

          {/* Raw Batti */}

          <div className="dipped-value-card">

            <div className="dipped-value-icon raw">
              R
            </div>

            <div>

              <span>RAW BATTI COST</span>

              <strong>
                ₹{Number(rawBattiCost).toFixed(2)}
              </strong>

              <small>/ kg</small>

            </div>

          </div>


          {/* Fragrance */}

          <div className="dipped-value-card">

            <div className="dipped-value-icon fragrance">
              F
            </div>

            <div>

              <span>FRAGRANCE COST</span>

              <strong>
                ₹{Number(fragranceCost).toFixed(2)}
              </strong>

              <small>/ kg</small>

            </div>

          </div>


          {/* Usage */}

          <div className="dipped-edit-card">

            <label>
              FRAGRANCE USAGE
            </label>

            <p>
              Amount of fragrance applied
            </p>

            <div className="dipped-edit-input">

              <input
                type="number"
                step="0.1"
                value={fragrancePercentage}
                onChange={(e) =>
                  setFragrancePercentage(
                    Number(e.target.value)
                  )
                }
              />

              <span>%</span>

            </div>

          </div>


          {/* Labour */}

          <div className="dipped-managed-card">

            <label>
              DIPPING LABOUR
            </label>

            <p>
              Managed from Manufacturing Expenses
            </p>

            <div className="dipped-managed-value">

              <strong>
                ₹{Number(dippingLabour).toFixed(2)}
              </strong>

              <span>/ kg</span>

            </div>

          </div>

        </div>

      </div>


      {/* =================================
          COST BREAKDOWN
      ================================= */}

      <div className="dipped-card">

        <div className="dipped-card-header">

          <div className="dipped-section-heading">

            <div className="dipped-section-number">
              02
            </div>

            <div>

              <h3>Cost Breakdown</h3>

              <p>
                See exactly how the dipped batti cost
                is built.
              </p>

            </div>

          </div>

        </div>


        <div className="dipped-breakdown">

          {/* RAW */}

          <div className="dipped-breakdown-item">

            <div className="dipped-breakdown-left">

              <div className="dipped-small-icon raw">
                R
              </div>

              <div>

                <span>RAW BATTI</span>

                <small>
                  Base batti production cost
                </small>

              </div>

            </div>

            <strong>
              ₹{Number(rawBattiCost).toFixed(2)}
            </strong>

          </div>


          {/* FRAGRANCE */}

          <div className="dipped-breakdown-item">

            <div className="dipped-breakdown-left">

              <div className="dipped-small-icon fragrance">
                F
              </div>

              <div>

                <span>
                  FRAGRANCE ({fragrancePercentage}%)
                </span>

                <small>
                  Fragrance contribution
                </small>

              </div>

            </div>

            <strong>
              ₹{fragranceContribution.toFixed(2)}
            </strong>

          </div>


          {/* LABOUR */}

          <div className="dipped-breakdown-item">

            <div className="dipped-breakdown-left">

              <div className="dipped-small-icon labour">
                L
              </div>

              <div>

                <span>DIPPING LABOUR</span>

                <small>
                  Production labour
                </small>

              </div>

            </div>

            <strong>
              ₹{Number(dippingLabour).toFixed(2)}
            </strong>

          </div>


          {/* TOTAL */}

          <div className="dipped-breakdown-total">

            <div>

              <span>
                TOTAL DIPPED BATTI COST
              </span>

              <small>
                Before packaging
              </small>

            </div>

            <strong>
              ₹{dippedBattiCost.toFixed(2)}
            </strong>

          </div>

        </div>

      </div>


      {/* =================================
          CALCULATION FLOW
      ================================= */}

      <div className="dipped-calculation-card">

        <div className="dipped-calculation-header">

          <div className="dipped-equals">
            =
          </div>

          <div>

            <h3>Dipped Batti Cost Calculation</h3>

            <p>
              Raw batti + fragrance contribution +
              dipping labour
            </p>

          </div>

        </div>


        <div className="dipped-flow">

          <div className="dipped-flow-box">

            <span>RAW BATTI</span>

            <strong>
              ₹{Number(rawBattiCost).toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>


          <div className="dipped-flow-operator">
            +
          </div>


          <div className="dipped-flow-box">

            <span>
              FRAGRANCE
            </span>

            <strong>
              ₹{fragranceContribution.toFixed(2)}
            </strong>

            <small>
              {fragrancePercentage}% usage
            </small>

          </div>


          <div className="dipped-flow-operator">
            +
          </div>


          <div className="dipped-flow-box">

            <span>
              DIPPING LABOUR
            </span>

            <strong>
              ₹{Number(dippingLabour).toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>


          <div className="dipped-flow-operator">
            =
          </div>


          <div className="dipped-flow-final">

            <span>
              FINAL DIPPED BATTI
            </span>

            <strong>
              ₹{dippedBattiCost.toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>

        </div>


        {/* FORMULA */}

        <div className="dipped-formula">

          <span>
            ₹{Number(rawBattiCost).toFixed(2)}
          </span>

          <span>+</span>

          <span>
            ₹{Number(fragranceCost).toFixed(2)}
            {" "}× {fragrancePercentage}%
          </span>

          <span>+</span>

          <span>
            ₹{Number(dippingLabour).toFixed(2)}
          </span>

          <span>=</span>

          <strong>
            ₹{dippedBattiCost.toFixed(2)} / kg
          </strong>

        </div>

      </div>


      {/* =================================
          FINAL RESULT
      ================================= */}

      <div className="dipped-final-result">

        <div className="dipped-result-left">

          <div className="dipped-result-check">
            ✓
          </div>

          <div>

            <span>
              DIPPED BATTI PRODUCTION COST
            </span>

            <h3>
              Final cost before packaging
            </h3>

          </div>

        </div>


        <div className="dipped-result-price">

          <strong>
            ₹{dippedBattiCost.toFixed(2)}
          </strong>

          <span>/ kg</span>

        </div>

      </div>

    </section>
  );
}

export default DippedBattiCosting;