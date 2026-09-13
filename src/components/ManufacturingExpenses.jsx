import "./ManufacturingExpenses.css";
import { useEffect, useState } from "react";


function ManufacturingExpenses({
  onRawBattiExpensesChange,
}) {
  // =========================
  // LABOUR COSTS
  // =========================

  const [extrusionPeople, setExtrusionPeople] = useState(1);
  const [extrusionWage, setExtrusionWage] = useState(200);
  const [extrusionProduction, setExtrusionProduction] = useState(40);

  const extrusionCost =
    (extrusionPeople * extrusionWage) /
    extrusionProduction;

  const [sortingPeople, setSortingPeople] = useState(1);
  const [sortingWage, setSortingWage] = useState(200);
  const [sortingProduction, setSortingProduction] = useState(200);

  const sortingCost =
    (sortingPeople * sortingWage) /
    sortingProduction;

  const [dryingPeople, setDryingPeople] = useState(1);
  const [dryingWage, setDryingWage] = useState(200);
  const [dryingProduction, setDryingProduction] = useState(120);

  const dryingCost =
    (dryingPeople * dryingWage) /
    dryingProduction;

  const [dippingPeople, setDippingPeople] = useState(1);
  const [dippingWage, setDippingWage] = useState(200);
  const [dippingProduction, setDippingProduction] = useState(300);

  const dippingCost =
    (dippingPeople * dippingWage) /
    dippingProduction;

  // =========================
  // POWER & FUEL
  // =========================

  const [extruderPower, setExtruderPower] = useState(4.5);
  const [blenderPower, setBlenderPower] = useState(2.5);
  const [sealingPower, setSealingPower] = useState(2);
  const [electricityRate, setElectricityRate] = useState(5);
  const [powerProduction, setPowerProduction] = useState(40);

  const totalPowerConsumption =
    Number(extruderPower) +
    Number(blenderPower) +
    Number(sealingPower);

  const totalPowerCostPerDay =
    totalPowerConsumption *
    Number(electricityRate);

  const powerCost =
    totalPowerCostPerDay /
    Number(powerProduction);

  // =========================
  // MAINTENANCE
  // =========================

  const [pistonCost, setPistonCost] = useState(1500);
  const [pistonProduction, setPistonProduction] = useState(1400);

  const [nozzleCost, setNozzleCost] = useState(250);
  const [nozzleProduction, setNozzleProduction] = useState(700);

  const [rocketCost, setRocketCost] = useState(250);
  const [rocketProduction, setRocketProduction] = useState(600);

  const [blenderMaintenance, setBlenderMaintenance] = useState(0.20);
  const [sealingBelt, setSealingBelt] = useState(0.10);

  const pistonMaintenance =
    pistonCost / pistonProduction;

  const nozzleMaintenance =
    nozzleCost / nozzleProduction;

  const rocketMaintenance =
    rocketCost / rocketProduction;

  const maintenanceCost =
    pistonMaintenance +
    nozzleMaintenance +
    rocketMaintenance +
    Number(blenderMaintenance) +
    Number(sealingBelt);

  // =========================
  // TRANSPORTATION
  // =========================

  const [vehicleCapacity, setVehicleCapacity] =
    useState(1500);

  const [transportCost, setTransportCost] =
    useState(3000);

  const transportationCost =
    transportCost / vehicleCapacity;

  // =========================
  // OVERHEAD
  // =========================

  const [overheadCost, setOverheadCost] =
    useState(2);

  // =========================
  // RAW BATTI TOTAL
  // =========================

  const rawBattiExpenses =
    extrusionCost +
    sortingCost +
    powerCost +
    maintenanceCost +
    transportationCost +
    Number(overheadCost);

  // =========================
  // SEND DATA TO APP
  // =========================

  useEffect(() => {
    if (onRawBattiExpensesChange) {
      onRawBattiExpensesChange({
        extrusion: extrusionCost,
        sorting: sortingCost,
        power: powerCost,
        maintenance: maintenanceCost,
        transportation: transportationCost,
        overhead: overheadCost,
        dipping: dippingCost,
        drying: dryingCost,
      });
    }
  }, [
    extrusionCost,
    sortingCost,
    powerCost,
    maintenanceCost,
    transportationCost,
    overheadCost,
    dippingCost,
    dryingCost,
    onRawBattiExpensesChange,
  ]);

  // =========================
  // SMALL INPUT COMPONENT
  // =========================

  const InputField = ({
    label,
    value,
    onChange,
    prefix,
    suffix,
    step,
  }) => (
    <div className="mfg-input">
      <label>{label}</label>

      <div className="mfg-input-box">
        {prefix && (
          <span className="mfg-input-prefix">
            {prefix}
          </span>
        )}

        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
        />

        {suffix && (
          <span className="mfg-input-suffix">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );

  // =========================
  // LABOUR CARD
  // =========================

  const LabourCard = ({
    number,
    title,
    description,
    cost,
    people,
    setPeople,
    wage,
    setWage,
    production,
    setProduction,
  }) => (
    <div className="mfg-labour-card">
      <div className="mfg-card-top">
        <div className="mfg-card-number">
          {number}
        </div>

        <div className="mfg-card-heading">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>

        <div className="mfg-card-cost">
          <span>Cost / Kg</span>
          <strong>
            ₹{cost.toFixed(2)}
          </strong>
        </div>
      </div>

      <div className="mfg-mini-inputs">
        <InputField
          label="People"
          value={people}
          onChange={setPeople}
        />

        <InputField
          label="Wage / Day"
          value={wage}
          onChange={setWage}
          prefix="₹"
        />

        <InputField
          label="Production / Day"
          value={production}
          onChange={setProduction}
          suffix="Kg"
        />
      </div>
    </div>
  );

  return (
    <section className="mfg-container">

      {/* =========================
          HEADER
         ========================= */}

      <div className="mfg-page-header">
        <div className="mfg-header-icon">
          ₹
        </div>

        <div>
          <span className="mfg-eyebrow">
            STEP 03 • PRODUCTION EXPENSES
          </span>

          <h2>
            Manufacturing Expenses
          </h2>

          <p>
            Manage labour, power, maintenance,
            transportation and overhead costs.
          </p>
        </div>

        <div className="mfg-header-total">
          <span>RAW BATTI EXPENSES</span>
          <strong>
            ₹{rawBattiExpenses.toFixed(2)}
          </strong>
          <small>/ kg</small>
        </div>
      </div>

      {/* =========================
          LABOUR
         ========================= */}

      <div className="mfg-section">

        <div className="mfg-section-header">
          <div className="mfg-section-icon">
            01
          </div>

          <div>
            <h3>Labour Costs</h3>
            <p>
              Labour required at each production stage.
            </p>
          </div>

          <div className="mfg-section-total">
            <span>LABOUR TOTAL</span>

            <strong>
              ₹
              {(
                extrusionCost +
                sortingCost +
                dryingCost +
                dippingCost
              ).toFixed(2)}
            </strong>

            <small>/ kg</small>
          </div>
        </div>

        <div className="mfg-labour-grid">

          <LabourCard
            number="01"
            title="Raw Batti Extrusion"
            description="Machine operator labour"
            cost={extrusionCost}
            people={extrusionPeople}
            setPeople={setExtrusionPeople}
            wage={extrusionWage}
            setWage={setExtrusionWage}
            production={extrusionProduction}
            setProduction={setExtrusionProduction}
          />

          <LabourCard
            number="02"
            title="Sorting"
            description="Sorting and quality checking"
            cost={sortingCost}
            people={sortingPeople}
            setPeople={setSortingPeople}
            wage={sortingWage}
            setWage={setSortingWage}
            production={sortingProduction}
            setProduction={setSortingProduction}
          />

          <LabourCard
            number="03"
            title="Drying & Blending"
            description="Premix drying and blending"
            cost={dryingCost}
            people={dryingPeople}
            setPeople={setDryingPeople}
            wage={dryingWage}
            setWage={setDryingWage}
            production={dryingProduction}
            setProduction={setDryingProduction}
          />

          <LabourCard
            number="04"
            title="Dipping"
            description="Fragrance dipping labour"
            cost={dippingCost}
            people={dippingPeople}
            setPeople={setDippingPeople}
            wage={dippingWage}
            setWage={setDippingWage}
            production={dippingProduction}
            setProduction={setDippingProduction}
          />

        </div>
      </div>

      {/* =========================
          POWER
         ========================= */}

      <div className="mfg-section">

        <div className="mfg-section-header">
          <div className="mfg-section-icon">
            02
          </div>

          <div>
            <h3>Power & Fuel</h3>
            <p>
              Electricity consumption used during production.
            </p>
          </div>

          <div className="mfg-section-total">
            <span>POWER COST</span>
            <strong>
              ₹{powerCost.toFixed(2)}
            </strong>
            <small>/ kg</small>
          </div>
        </div>

        <div className="mfg-power-layout">

          <div className="mfg-power-inputs">

            <InputField
              label="Extruder Consumption / Day"
              value={extruderPower}
              onChange={setExtruderPower}
              suffix="units"
              step="0.1"
            />

            <InputField
              label="Blender Consumption / Day"
              value={blenderPower}
              onChange={setBlenderPower}
              suffix="units"
              step="0.1"
            />

            <InputField
              label="Sealing Machine / Day"
              value={sealingPower}
              onChange={setSealingPower}
              suffix="units"
              step="0.1"
            />

            <InputField
              label="Electricity Rate"
              value={electricityRate}
              onChange={setElectricityRate}
              prefix="₹"
            />

            <InputField
              label="Production / Day"
              value={powerProduction}
              onChange={setPowerProduction}
              suffix="Kg"
            />

          </div>

          <div className="mfg-highlight">

            <span className="mfg-highlight-label">
              DAILY POWER COST
            </span>

            <strong>
              ₹{totalPowerCostPerDay.toFixed(2)}
            </strong>

            <p>
              {totalPowerConsumption.toFixed(1)}
              {" "}units/day × ₹
              {Number(electricityRate).toFixed(2)}
            </p>

            <div className="mfg-highlight-divider" />

            <span className="mfg-highlight-label">
              COST PER KG
            </span>

            <b>
              ₹{powerCost.toFixed(2)} / Kg
            </b>

          </div>

        </div>
      </div>

      {/* =========================
          MAINTENANCE
         ========================= */}

      <div className="mfg-section">

        <div className="mfg-section-header">
          <div className="mfg-section-icon">
            03
          </div>

          <div>
            <h3>Maintenance</h3>
            <p>
              Machine and equipment maintenance allocation.
            </p>
          </div>

          <div className="mfg-section-total">
            <span>MAINTENANCE</span>
            <strong>
              ₹{maintenanceCost.toFixed(2)}
            </strong>
            <small>/ kg</small>
          </div>
        </div>

        <div className="mfg-maintenance-grid">

          <div className="mfg-maintenance-card">
            <div className="mfg-maintenance-title">
              <div>
                <span>01</span>
                <h4>Piston</h4>
              </div>

              <strong>
                ₹{pistonMaintenance.toFixed(2)}
              </strong>
            </div>

            <div className="mfg-maintenance-inputs">

              <InputField
                label="Cost"
                value={pistonCost}
                onChange={setPistonCost}
                prefix="₹"
              />

              <InputField
                label="Production"
                value={pistonProduction}
                onChange={setPistonProduction}
                suffix="Kg"
              />

            </div>

            <small>Cost allocated per kg</small>
          </div>

          <div className="mfg-maintenance-card">
            <div className="mfg-maintenance-title">
              <div>
                <span>02</span>
                <h4>Nozzle</h4>
              </div>

              <strong>
                ₹{nozzleMaintenance.toFixed(2)}
              </strong>
            </div>

            <div className="mfg-maintenance-inputs">

              <InputField
                label="Cost"
                value={nozzleCost}
                onChange={setNozzleCost}
                prefix="₹"
              />

              <InputField
                label="Production"
                value={nozzleProduction}
                onChange={setNozzleProduction}
                suffix="Kg"
              />

            </div>

            <small>Cost allocated per kg</small>
          </div>

          <div className="mfg-maintenance-card">
            <div className="mfg-maintenance-title">
              <div>
                <span>03</span>
                <h4>Rocket</h4>
              </div>

              <strong>
                ₹{rocketMaintenance.toFixed(2)}
              </strong>
            </div>

            <div className="mfg-maintenance-inputs">

              <InputField
                label="Cost"
                value={rocketCost}
                onChange={setRocketCost}
                prefix="₹"
              />

              <InputField
                label="Production"
                value={rocketProduction}
                onChange={setRocketProduction}
                suffix="Kg"
              />

            </div>

            <small>Cost allocated per kg</small>
          </div>

          <div className="mfg-maintenance-card simple">

            <div className="mfg-maintenance-title">
              <div>
                <span>04</span>
                <h4>Blender</h4>
              </div>

              <strong>
                ₹{Number(blenderMaintenance).toFixed(2)}
              </strong>
            </div>

            <InputField
              label="Maintenance / Kg"
              value={blenderMaintenance}
              onChange={setBlenderMaintenance}
              prefix="₹"
              step="0.01"
            />

          </div>

          <div className="mfg-maintenance-card simple">

            <div className="mfg-maintenance-title">
              <div>
                <span>05</span>
                <h4>Sealing Belt</h4>
              </div>

              <strong>
                ₹{Number(sealingBelt).toFixed(2)}
              </strong>
            </div>

            <InputField
              label="Maintenance / Kg"
              value={sealingBelt}
              onChange={setSealingBelt}
              prefix="₹"
              step="0.01"
            />

          </div>

        </div>
      </div>

      {/* =========================
          TRANSPORT + OVERHEAD
         ========================= */}

      <div className="mfg-two-column">

        <div className="mfg-section compact">

          <div className="mfg-section-header">
            <div className="mfg-section-icon">
              04
            </div>

            <div>
              <h3>Transportation</h3>
              <p>Transport cost allocation.</p>
            </div>
          </div>

          <div className="mfg-two-inputs">

            <InputField
              label="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={setVehicleCapacity}
              suffix="Kg"
            />

            <InputField
              label="Transportation Cost"
              value={transportCost}
              onChange={setTransportCost}
              prefix="₹"
            />

          </div>

          <div className="mfg-result-line">
            <span>Transportation / Kg</span>
            <strong>
              ₹{transportationCost.toFixed(2)}
            </strong>
          </div>

        </div>

        <div className="mfg-section compact">

          <div className="mfg-section-header">
            <div className="mfg-section-icon">
              05
            </div>

            <div>
              <h3>Overheads / Rental</h3>
              <p>Factory overhead allocation.</p>
            </div>
          </div>

          <InputField
            label="Overhead Cost / Kg"
            value={overheadCost}
            onChange={setOverheadCost}
            prefix="₹"
            step="0.01"
          />

          <div className="mfg-result-line">
            <span>Overhead / Kg</span>
            <strong>
              ₹{Number(overheadCost).toFixed(2)}
            </strong>
          </div>

        </div>

      </div>

      {/* =========================
          FINAL SUMMARY
         ========================= */}
         {/* =====================================================
    FINAL EXPENSE SUMMARY
    ===================================================== */}

<div className="mfg-summary">

  {/* Summary Header */}

  <div className="mfg-summary-header">

    <div className="mfg-summary-title">

      <div className="mfg-summary-icon">
        ₹
      </div>

      <div>
        <span className="mfg-summary-eyebrow">
          FINAL EXPENSE BREAKDOWN
        </span>

        <h3>
          Manufacturing Expense Summary
        </h3>

        <p>
          Costs automatically flow into the
          Raw Batti and Dipped Batti calculations.
        </p>
      </div>

    </div>

    <div className="mfg-summary-total">

      <span>RAW BATTI EXPENSES</span>

      <strong>
        ₹{rawBattiExpenses.toFixed(2)}
      </strong>

      <small>/ Kg</small>

    </div>

  </div>


  {/* Expense Breakdown */}

  <div className="mfg-summary-grid">

    <div className="mfg-summary-item">
      <div>
        <span className="mfg-summary-number">
          01
        </span>

        <div>
          <strong>Raw Batti Extrusion</strong>
          <small>Machine operator labour</small>
        </div>
      </div>

      <b>
        ₹{extrusionCost.toFixed(2)}
      </b>
    </div>


    <div className="mfg-summary-item">
      <div>
        <span className="mfg-summary-number">
          02
        </span>

        <div>
          <strong>Sorting</strong>
          <small>Quality checking</small>
        </div>
      </div>

      <b>
        ₹{sortingCost.toFixed(2)}
      </b>
    </div>


    <div className="mfg-summary-item">
      <div>
        <span className="mfg-summary-number">
          03
        </span>

        <div>
          <strong>Drying & Blending</strong>
          <small>Premix drying labour</small>
        </div>
      </div>

      <b>
        ₹{dryingCost.toFixed(2)}
      </b>
    </div>


    <div className="mfg-summary-item">
      <div>
        <span className="mfg-summary-number">
          04
        </span>

        <div>
          <strong>Dipping</strong>
          <small>Fragrance dipping labour</small>
        </div>
      </div>

      <b>
        ₹{dippingCost.toFixed(2)}
      </b>
    </div>


    <div className="mfg-summary-item">
      <div>
        <span className="mfg-summary-number">
          05
        </span>

        <div>
          <strong>Power & Fuel</strong>
          <small>Electricity consumption</small>
        </div>
      </div>

      <b>
        ₹{powerCost.toFixed(2)}
      </b>
    </div>


    <div className="mfg-summary-item">
      <div>
        <span className="mfg-summary-number">
          06
        </span>

        <div>
          <strong>Maintenance</strong>
          <small>Machine maintenance</small>
        </div>
      </div>

      <b>
        ₹{maintenanceCost.toFixed(2)}
      </b>
    </div>


    <div className="mfg-summary-item">
      <div>
        <span className="mfg-summary-number">
          07
        </span>

        <div>
          <strong>Transportation</strong>
          <small>Transport cost</small>
        </div>
      </div>

      <b>
        ₹{transportationCost.toFixed(2)}
      </b>
    </div>


    <div className="mfg-summary-item">
      <div>
        <span className="mfg-summary-number">
          08
        </span>

        <div>
          <strong>Overheads</strong>
          <small>Rental & other overheads</small>
        </div>
      </div>

      <b>
        ₹{Number(overheadCost).toFixed(2)}
      </b>
    </div>

  </div>


  {/* Final Totals */}

  <div className="mfg-final-row">

    <div className="mfg-raw-total">

      <div>
        <span>RAW BATTI RELATED EXPENSES</span>

        <small>
          Added to Raw Batti costing
        </small>
      </div>

      <strong>
        ₹{rawBattiExpenses.toFixed(2)}
        <small>/ Kg</small>
      </strong>

    </div>


    <div className="mfg-dipping-total">

      <div>
        <span>DIPPING LABOUR</span>

        <small>
          Used in Dipped Batti costing
        </small>
      </div>

      <strong>
        ₹{dippingCost.toFixed(2)}
        <small>/ Kg</small>
      </strong>

    </div>

  </div>

</div>

    </section>
  );
}

export default ManufacturingExpenses;
