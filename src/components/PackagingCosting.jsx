import { useEffect, useState } from "react";
import "./PackagingCosting.css";

function PackagingCosting({
  dippedBattiCost,
  onCostChange,
  onPackSizeChange,
  onPackagingCostChange,
}) {
  // Product details
  const [sticksPerKg, setSticksPerKg] = useState(1050);
  const [sticksPerPack, setSticksPerPack] = useState(20);

  // Primary packaging
  const [primaryPricePerKg, setPrimaryPricePerKg] = useState(270);
  const [primaryGst, setPrimaryGst] = useState(18);
  const [primaryUnitsPerKg, setPrimaryUnitsPerKg] = useState(430);

  // Secondary packaging
  const [secondaryPackPrice, setSecondaryPackPrice] = useState(18);
  const [secondaryUnits, setSecondaryUnits] = useState(144);

  // Tertiary packaging
  const [tertiaryPackPrice, setTertiaryPackPrice] = useState(18);
  const [tertiaryUnits, setTertiaryUnits] = useState(720);

  // Packing labour
  const [packingLabour, setPackingLabour] = useState(0.2);

  // Primary packaging price including GST
  const primaryPriceWithGst =
    primaryPricePerKg * (1 + primaryGst / 100);

  // Primary pouch cost per pack
  const primaryCostPerPack =
    primaryPriceWithGst / primaryUnitsPerKg;

  // Secondary packaging cost per pack
  const secondaryCostPerPack =
    secondaryPackPrice / secondaryUnits;

  // Tertiary packaging cost per pack
  const tertiaryCostPerPack =
    tertiaryPackPrice / tertiaryUnits;

  // Total packaging material cost
  const totalPackagingMaterialCost =
    primaryCostPerPack +
    secondaryCostPerPack +
    tertiaryCostPerPack;

  // Total packaging cost including labour
  const totalPackagingCost =
    totalPackagingMaterialCost + packingLabour;

  // Cost of batti per stick
  const costPerStick =
    Number(dippedBattiCost) / Number(sticksPerKg);

  // Batti cost for one pack
  const battiCostPerPack =
    costPerStick * Number(sticksPerPack);

  // Final production cost per pack
  const finalCostPerPack =
    battiCostPerPack + totalPackagingCost;

  useEffect(() => {
    onCostChange(finalCostPerPack);
  }, [finalCostPerPack, onCostChange]);

  useEffect(() => {
    onPackSizeChange(sticksPerPack);
  }, [sticksPerPack, onPackSizeChange]);

  useEffect(() => {
    onPackagingCostChange(totalPackagingCost);
  }, [totalPackagingCost, onPackagingCostChange]);

  return (
    <div className="packaging-page">

      {/* Header */}
      <div className="packaging-title">
        <div className="packaging-title-icon">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        </div>

        <div>
          <h2>Packaging & Final Costing</h2>
          <p>
            Convert dipped batti cost into the final cost per retail pack.
          </p>
        </div>
      </div>

      {/* Production quantity */}
      <section className="packaging-card">

        <div className="packaging-card-header">
          <div>
            <span className="packaging-step-label">01</span>
            <div>
              <h3>Pack Configuration</h3>
              <p>Define the number of sticks going into each pack.</p>
            </div>
          </div>
        </div>

        <div className="packaging-input-grid two-columns">

          <div className="packaging-input">
            <label>Sticks Per Kg</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={sticksPerKg}
                onChange={(e) =>
                  setSticksPerKg(Number(e.target.value))
                }
              />
              <span>sticks</span>
            </div>
            <small>Number of sticks produced from 1 kg</small>
          </div>

          <div className="packaging-input">
            <label>Sticks Per Pack</label>
            <div className="input-with-unit">
              <input
                type="number"
                value={sticksPerPack}
                onChange={(e) =>
                  setSticksPerPack(Number(e.target.value))
                }
              />
              <span>sticks</span>
            </div>
            <small>Retail pack quantity</small>
          </div>

        </div>

        <div className="packaging-info-strip">
          <span>Current pack size</span>
          <strong>{sticksPerPack} sticks / pack</strong>
        </div>

      </section>

      {/* Batti cost */}
      <section className="packaging-card">

        <div className="packaging-card-header">
          <div>
            <span className="packaging-step-label">02</span>
            <div>
              <h3>Dipped Batti Cost</h3>
              <p>Calculate the batti value contained in one pack.</p>
            </div>
          </div>
        </div>

        <div className="packaging-cost-grid">

          <div className="packaging-cost-item">
            <span>Dipped Batti</span>
            <strong>
              ₹{Number(dippedBattiCost).toFixed(2)}
            </strong>
            <small>/ kg</small>
          </div>

          <div className="packaging-cost-item">
            <span>Cost Per Stick</span>
            <strong>
              ₹{costPerStick.toFixed(3)}
            </strong>
            <small>per stick</small>
          </div>

          <div className="packaging-cost-item highlighted">
            <span>Batti Cost / Pack</span>
            <strong>
              ₹{battiCostPerPack.toFixed(2)}
            </strong>
            <small>{sticksPerPack} sticks</small>
          </div>

        </div>

        <div className="packaging-formula">
          <span>Calculation</span>
          <strong>
            ₹{Number(dippedBattiCost).toFixed(2)} ÷ {sticksPerKg} ×{" "}
            {sticksPerPack} = ₹{battiCostPerPack.toFixed(2)}
          </strong>
        </div>

      </section>

      {/* Packaging materials */}
      <section className="packaging-card">

        <div className="packaging-card-header">
          <div>
            <span className="packaging-step-label">03</span>
            <div>
              <h3>Packaging Materials</h3>
              <p>
                Enter the purchase price and packing quantity for each layer.
              </p>
            </div>
          </div>
        </div>

        {/* Primary */}
        <div className="packaging-material">

          <div className="material-heading">
            <div className="material-number">A</div>
            <div>
              <h4>Primary Packaging</h4>
              <p>Flexi Pouch</p>
            </div>

            <div className="material-result">
              <span>Cost / Pack</span>
              <strong>₹{primaryCostPerPack.toFixed(2)}</strong>
            </div>
          </div>

          <div className="packaging-input-grid three-columns">

            <div className="packaging-input">
              <label>Price / Kg</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={primaryPricePerKg}
                  onChange={(e) =>
                    setPrimaryPricePerKg(Number(e.target.value))
                  }
                />
                <span>₹</span>
              </div>
            </div>

            <div className="packaging-input">
              <label>GST</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={primaryGst}
                  onChange={(e) =>
                    setPrimaryGst(Number(e.target.value))
                  }
                />
                <span>%</span>
              </div>
            </div>

            <div className="packaging-input">
              <label>Pouches / Kg</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={primaryUnitsPerKg}
                  onChange={(e) =>
                    setPrimaryUnitsPerKg(Number(e.target.value))
                  }
                />
                <span>pcs</span>
              </div>
            </div>

          </div>

          <div className="material-calculation">
            <span>Price including GST</span>
            <strong>₹{primaryPriceWithGst.toFixed(2)} / kg</strong>
          </div>

        </div>

        {/* Secondary */}
        <div className="packaging-material">

          <div className="material-heading">
            <div className="material-number">B</div>

            <div>
              <h4>Secondary Packaging</h4>
              <p>Outer Bag</p>
            </div>

            <div className="material-result">
              <span>Cost / Pack</span>
              <strong>₹{secondaryCostPerPack.toFixed(2)}</strong>
            </div>
          </div>

          <div className="packaging-input-grid two-columns">

            <div className="packaging-input">
              <label>Outer Bag Price</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={secondaryPackPrice}
                  onChange={(e) =>
                    setSecondaryPackPrice(Number(e.target.value))
                  }
                />
                <span>₹</span>
              </div>
            </div>

            <div className="packaging-input">
              <label>Packs Per Bag</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={secondaryUnits}
                  onChange={(e) =>
                    setSecondaryUnits(Number(e.target.value))
                  }
                />
                <span>packs</span>
              </div>
            </div>

          </div>

        </div>

        {/* Tertiary */}
        <div className="packaging-material">

          <div className="material-heading">
            <div className="material-number">C</div>

            <div>
              <h4>Tertiary Packaging</h4>
              <p>Bori</p>
            </div>

            <div className="material-result">
              <span>Cost / Pack</span>
              <strong>₹{tertiaryCostPerPack.toFixed(2)}</strong>
            </div>
          </div>

          <div className="packaging-input-grid two-columns">

            <div className="packaging-input">
              <label>Bori Price</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={tertiaryPackPrice}
                  onChange={(e) =>
                    setTertiaryPackPrice(Number(e.target.value))
                  }
                />
                <span>₹</span>
              </div>
            </div>

            <div className="packaging-input">
              <label>Packs Per Bori</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  value={tertiaryUnits}
                  onChange={(e) =>
                    setTertiaryUnits(Number(e.target.value))
                  }
                />
                <span>packs</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Packing labour */}
      <section className="packaging-card">

        <div className="packaging-card-header">
          <div>
            <span className="packaging-step-label">04</span>
            <div>
              <h3>Packing Labour</h3>
              <p>Labour required to pack one retail unit.</p>
            </div>
          </div>
        </div>

        <div className="packaging-input-grid two-columns">

          <div className="packaging-input">
            <label>Labour Cost / Pack</label>
            <div className="input-with-unit">
              <input
                type="number"
                step="0.01"
                value={packingLabour}
                onChange={(e) =>
                  setPackingLabour(Number(e.target.value))
                }
              />
              <span>₹</span>
            </div>
          </div>

        </div>

      </section>

      {/* Packaging cost summary */}
      <section className="packaging-summary-card">

        <div className="summary-heading">
          <div>
            <span className="packaging-step-label">05</span>
            <div>
              <h3>Final Cost Breakdown</h3>
              <p>Complete cost of one finished retail pack.</p>
            </div>
          </div>

          <div className="summary-pack-badge">
            {sticksPerPack} sticks
          </div>
        </div>

        <div className="summary-lines">

          <div>
            <span>Dipped Batti</span>
            <strong>₹{battiCostPerPack.toFixed(2)}</strong>
          </div>

          <div>
            <span>Primary Packaging</span>
            <strong>₹{primaryCostPerPack.toFixed(2)}</strong>
          </div>

          <div>
            <span>Secondary Packaging</span>
            <strong>₹{secondaryCostPerPack.toFixed(2)}</strong>
          </div>

          <div>
            <span>Tertiary Packaging</span>
            <strong>₹{tertiaryCostPerPack.toFixed(2)}</strong>
          </div>

          <div>
            <span>Packing Labour</span>
            <strong>₹{packingLabour.toFixed(2)}</strong>
          </div>

        </div>

        <div className="packaging-total">

          <div>
            <span>Total Production Cost</span>
            <small>per {sticksPerPack}-stick pack</small>
          </div>

          <strong>₹{finalCostPerPack.toFixed(2)}</strong>

        </div>

      </section>

      {/* Cost flow */}
      <div className="packaging-cost-flow">

        <div className="flow-item">
          <span>Dipped Batti</span>
          <strong>
            ₹{battiCostPerPack.toFixed(2)}
          </strong>
        </div>

        <div className="flow-plus">+</div>

        <div className="flow-item">
          <span>Packaging</span>
          <strong>
            ₹{totalPackagingCost.toFixed(2)}
          </strong>
        </div>

        <div className="flow-equals">=</div>

        <div className="flow-final">
          <span>Final Cost / Pack</span>
          <strong>
            ₹{finalCostPerPack.toFixed(2)}
          </strong>
        </div>

      </div>

    </div>
  );
}

export default PackagingCosting;