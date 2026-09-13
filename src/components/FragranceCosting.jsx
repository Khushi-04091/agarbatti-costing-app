import { useEffect, useState } from "react";
import "./FragranceCosting.css";

function FragranceCosting({ onCostChange }) {
  const [depPrice, setDepPrice] = useState(167);
  const [depGst, setDepGst] = useState(18);

  const [concentratedPrice, setConcentratedPrice] = useState(1062);
  const [concentratedGst, setConcentratedGst] = useState(18);

  const [depPercentage, setDepPercentage] = useState(80);
  const [concentratedPercentage, setConcentratedPercentage] =
    useState(20);

  // Price including GST
  const depPriceWithGst =
    depPrice * (1 + depGst / 100);

  const concentratedPriceWithGst =
    concentratedPrice * (1 + concentratedGst / 100);

  // Cost contribution
  const depCost =
    depPriceWithGst * (depPercentage / 100);

  const concentratedCost =
    concentratedPriceWithGst *
    (concentratedPercentage / 100);

  // Final fragrance cost
  const dilutedFragranceCost =
    depCost + concentratedCost;

  const totalPercentage =
    Number(depPercentage) +
    Number(concentratedPercentage);

  const percentageIsValid =
    totalPercentage === 100;

  useEffect(() => {
    onCostChange(dilutedFragranceCost);
  }, [dilutedFragranceCost, onCostChange]);

  return (
    <section className="fragrance-module">

      {/* =================================
          HEADER
      ================================= */}

      <div className="fragrance-module-header">

        <div className="fragrance-title-area">

          <div className="fragrance-title-icon">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 3h6" />
              <path d="M10 3v5l-5 8a4 4 0 0 0 3.4 5.9h7.2A4 4 0 0 0 19 16l-5-8V3" />
              <path d="M8 15h8" />
              <path d="M9 18h6" />
            </svg>

          </div>

          <div>

            <span className="fragrance-module-label">
              STEP 04 · FRAGRANCE MIX
            </span>

            <h2>Fragrance Costing</h2>

            <p>
              Calculate the diluted fragrance cost
              used for agarbatti production.
            </p>

          </div>

        </div>

        <div className="fragrance-total-badge">

          <span>FINAL FRAGRANCE</span>

          <strong>
            ₹{dilutedFragranceCost.toFixed(2)}
          </strong>

          <small>/ kg</small>

        </div>

      </div>


      {/* =================================
          MATERIAL CARD
      ================================= */}

      <div className="fragrance-card">

        <div className="fragrance-card-header">

          <div className="fragrance-section-heading">

            <div className="fragrance-section-number">
              01
            </div>

            <div>

              <h3>Fragrance Materials</h3>

              <p>
                Enter basic price, GST and dilution
                percentage for each fragrance ingredient.
              </p>

            </div>

          </div>

          <div
            className={`fragrance-status ${
              percentageIsValid
                ? "valid"
                : "invalid"
            }`}
          >
            <span />
            {totalPercentage}%
            {percentageIsValid
              ? " Mix ✓"
              : " · Required 100%"}
          </div>

        </div>


        {/* =================================
            DEP
        ================================= */}

        <div className="fragrance-material">

          <div className="fragrance-material-title">

            <div className="fragrance-material-number">
              01
            </div>

            <div>

              <h4>DEP Oil</h4>

              <p>
                Diluting agent / carrier oil
              </p>

            </div>

          </div>


          <div className="fragrance-input">

            <label>Basic Price / Kg</label>

            <div className="fragrance-input-box">

              <span>₹</span>

              <input
                type="number"
                step="0.01"
                value={depPrice}
                onChange={(e) =>
                  setDepPrice(
                    Number(e.target.value)
                  )
                }
              />

            </div>

          </div>


          <div className="fragrance-input">

            <label>GST</label>

            <div className="fragrance-input-box">

              <input
                type="number"
                step="0.1"
                value={depGst}
                onChange={(e) =>
                  setDepGst(
                    Number(e.target.value)
                  )
                }
              />

              <span>%</span>

            </div>

          </div>


          <div className="fragrance-calculated">

            <span>PRICE WITH GST</span>

            <strong>
              ₹{depPriceWithGst.toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>


          <div className="fragrance-input">

            <label>Dilution</label>

            <div className="fragrance-input-box">

              <input
                type="number"
                step="0.1"
                value={depPercentage}
                onChange={(e) =>
                  setDepPercentage(
                    Number(e.target.value)
                  )
                }
              />

              <span>%</span>

            </div>

          </div>


          <div className="fragrance-contribution">

            <span>CONTRIBUTION</span>

            <strong>
              ₹{depCost.toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>

        </div>


        {/* =================================
            CONCENTRATED
        ================================= */}

        <div className="fragrance-material">

          <div className="fragrance-material-title">

            <div className="fragrance-material-number perfume">
              02
            </div>

            <div>

              <h4>Concentrated Fragrance</h4>

              <p>
                Concentrated perfume / fragrance oil
              </p>

            </div>

          </div>


          <div className="fragrance-input">

            <label>Basic Price / Kg</label>

            <div className="fragrance-input-box">

              <span>₹</span>

              <input
                type="number"
                step="0.01"
                value={concentratedPrice}
                onChange={(e) =>
                  setConcentratedPrice(
                    Number(e.target.value)
                  )
                }
              />

            </div>

          </div>


          <div className="fragrance-input">

            <label>GST</label>

            <div className="fragrance-input-box">

              <input
                type="number"
                step="0.1"
                value={concentratedGst}
                onChange={(e) =>
                  setConcentratedGst(
                    Number(e.target.value)
                  )
                }
              />

              <span>%</span>

            </div>

          </div>


          <div className="fragrance-calculated">

            <span>PRICE WITH GST</span>

            <strong>
              ₹{concentratedPriceWithGst.toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>


          <div className="fragrance-input">

            <label>Dilution</label>

            <div className="fragrance-input-box">

              <input
                type="number"
                step="0.1"
                value={concentratedPercentage}
                onChange={(e) =>
                  setConcentratedPercentage(
                    Number(e.target.value)
                  )
                }
              />

              <span>%</span>

            </div>

          </div>


          <div className="fragrance-contribution">

            <span>CONTRIBUTION</span>

            <strong>
              ₹{concentratedCost.toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>

        </div>


        {/* =================================
            TOTAL
        ================================= */}

        <div className="fragrance-total-row">

          <div>

            <span>TOTAL DILUTION</span>

            <strong>
              {totalPercentage}%
            </strong>

          </div>

          <div className="fragrance-total-cost">

            <span>TOTAL FRAGRANCE COST</span>

            <strong>
              ₹{dilutedFragranceCost.toFixed(2)}
            </strong>

            <small>/ kg</small>

          </div>

        </div>


        {/* WARNING */}

        {!percentageIsValid && (

          <div className="fragrance-warning">

            <div>!</div>

            <span>
              Dilution percentage must equal 100%.
              Current total:
              <strong>
                {" "}{totalPercentage}%
              </strong>
            </span>

          </div>

        )}

      </div>


      {/* =================================
          COST BREAKDOWN
      ================================= */}

      <div className="fragrance-calculation-card">

        <div className="fragrance-calculation-header">

          <div className="fragrance-equals">
            =
          </div>

          <div>

            <h3>Fragrance Cost Calculation</h3>

            <p>
              Final cost is calculated from the
              contribution of each ingredient.
            </p>

          </div>

        </div>


        <div className="fragrance-flow">

          <div className="fragrance-flow-box">

            <span>DEP CONTRIBUTION</span>

            <strong>
              ₹{depCost.toFixed(2)}
            </strong>

            <small>
              {depPercentage}% of mix
            </small>

          </div>


          <div className="fragrance-operator">
            +
          </div>


          <div className="fragrance-flow-box">

            <span>CONCENTRATED FRAGRANCE</span>

            <strong>
              ₹{concentratedCost.toFixed(2)}
            </strong>

            <small>
              {concentratedPercentage}% of mix
            </small>

          </div>


          <div className="fragrance-operator">
            =
          </div>


          <div className="fragrance-flow-final">

            <span>DILUTED FRAGRANCE COST</span>

            <strong>
              ₹{dilutedFragranceCost.toFixed(2)}
            </strong>

            <small>
              per kg
            </small>

          </div>

        </div>


        <div className="fragrance-formula">

          <span>
            ₹{depPriceWithGst.toFixed(2)} ×{" "}
            {depPercentage}%
          </span>

          <span>+</span>

          <span>
            ₹{concentratedPriceWithGst.toFixed(2)}
            {" "}× {concentratedPercentage}%
          </span>

          <span>=</span>

          <strong>
            ₹{dilutedFragranceCost.toFixed(2)} / kg
          </strong>

        </div>

      </div>


      {/* =================================
          FINAL RESULT
      ================================= */}

      <div className="fragrance-final-result">

        <div className="fragrance-result-left">

          <div className="fragrance-result-check">
            ✓
          </div>

          <div>

            <span>
              FRAGRANCE PRODUCTION COST
            </span>

            <h3>
              Final diluted fragrance cost
            </h3>

          </div>

        </div>


        <div className="fragrance-result-price">

          <strong>
            ₹{dilutedFragranceCost.toFixed(2)}
          </strong>

          <span>/ kg</span>

        </div>

      </div>

    </section>
  );
}

export default FragranceCosting;