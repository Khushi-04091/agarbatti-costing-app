import React, { useState } from "react";
import "./App.css";

import PremixCosting from "./components/PremixCosting";
import RawBattiCosting from "./components/RawBattiCosting";
import FragranceCosting from "./components/FragranceCosting";
import DippedBattiCosting from "./components/DippedBattiCosting";
import PackagingCosting from "./components/PackagingCosting";
import ManufacturingExpenses from "./components/ManufacturingExpenses";

const steps = [
  {
    number: 1,
    title: "Product",
    subtitle: "Basic details",
  },
  {
    number: 2,
    title: "Premix",
    subtitle: "Raw materials",
  },
  {
    number: 3,
    title: "Raw Batti",
    subtitle: "Bamboo + premix",
  },
  {
    number: 4,
    title: "Fragrance",
    subtitle: "DEP + perfume",
  },
  {
    number: 5,
    title: "Dipped Batti",
    subtitle: "Fragrance coating",
  },
  {
    number: 6,
    title: "Packaging",
    subtitle: "Pack & finish",
  },
  {
    number: 7,
    title: "Summary",
    subtitle: "Final cost",
  },
];

function Icon({ type, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "product") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    );
  }

  if (type === "premix") {
    return (
      <svg {...common}>
        <path d="M5 8h14l-1 11H6L5 8Z" />
        <path d="M8 8V5h8v3M9 12h6M9 15h4" />
      </svg>
    );
  }

  if (type === "batti") {
    return (
      <svg {...common}>
        <path d="M4 18c4-5 8-9 16-13" />
        <path d="M5 20c4-5 8-9 15-12" />
        <path d="M17 4l2 1-1 2" />
      </svg>
    );
  }

  if (type === "fragrance") {
    return (
      <svg {...common}>
        <path d="M9 4h6M10 4v4h4V4" />
        <path d="M8 8h8l1 11H7L8 8Z" />
        <path d="M10 12h4M10 15h4" />
      </svg>
    );
  }

  if (type === "dip") {
    return (
      <svg {...common}>
        <path d="M6 5h12" />
        <path d="M8 5v4a4 4 0 0 0 8 0V5" />
        <path d="M12 13v7M9 20h6" />
      </svg>
    );
  }

  if (type === "packaging") {
    return (
      <svg {...common}>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="M4 7v10l8 4 8-4V7M12 11v10" />
      </svg>
    );
  }

  if (type === "summary") {
    return (
      <svg {...common}>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19V3" />
      </svg>
    );
  }

  return null;
}

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const [productName, setProductName] = useState(
    "Machine Made Agarbatti"
  );

  const [productSize, setProductSize] = useState(
    '8" - 1050 Count'
  );

  const [premixCost, setPremixCost] = useState(0);
  const [rawBattiCost, setRawBattiCost] = useState(0);
  const [fragranceCost, setFragranceCost] = useState(0);
  const [dippedBattiCost, setDippedBattiCost] = useState(0);
  const [finalCostPerPack, setFinalCostPerPack] = useState(0);

  const [sticksPerPack, setSticksPerPack] = useState(20);
  const [packagingCost, setPackagingCost] = useState(0);

  const [manufacturingExpenses, setManufacturingExpenses] =
    useState({
      extrusion: 5,
      sorting: 1,
      drying: 1.67,
      dipping: 0.67,
      power: 1.13,
      maintenance: 2.15,
      transportation: 2,
      overhead: 2,
    });

  const stepImages = {
    1: "/images/agarbatti.jpg",
    2: "/images/bamboo.jpg",
    3: "/images/machine.jpg",
    4: "/images/fragrance.jpg",
    5: "/images/workers.jpg",
    6: "/images/packaging.jpg",
    7: "/images/agarbatti.jpg",
  };

  const stepIcons = [
    "product",
    "premix",
    "batti",
    "fragrance",
    "dip",
    "packaging",
    "summary",
  ];

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      scrollTop();
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      scrollTop();
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    scrollTop();
  };

  const getStepTitle = () => {
    return steps[currentStep - 1].title;
  };

  const getStepDescription = () => {
    const descriptions = {
      1: "Start by entering the product details.",
      2: "Calculate the cost of charcoal, joss powder and saw dust.",
      3: "Calculate bamboo, premix and manufacturing expenses.",
      4: "Calculate the fragrance mixture and its cost.",
      5: "Calculate the final dipped batti cost.",
      6: "Add pouch, secondary, tertiary and packing labour costs.",
      7: "Review the complete production costing.",
    };

    return descriptions[currentStep];
  };

  const getCurrentCost = () => {
    switch (currentStep) {
      case 2:
        return Number(premixCost || 0).toFixed(2);

      case 3:
        return Number(rawBattiCost || 0).toFixed(2);

      case 4:
        return Number(fragranceCost || 0).toFixed(2);

      case 5:
        return Number(dippedBattiCost || 0).toFixed(2);

      case 6:
      case 7:
        return Number(finalCostPerPack || 0).toFixed(2);

      default:
        return "0.00";
    }
  };

  const getCurrentUnit = () => {
    return currentStep >= 6 ? "per pack" : "per kg";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      /* =====================================================
         PRODUCT
         ===================================================== */

      case 1:
        return (
          <div className="content-card product-form-card">
            <div className="card-heading">
              <div className="heading-icon">
                <Icon type="product" size={25} />
              </div>

              <div>
                <h2>Product Details</h2>
                <p>
                  Enter the basic information for this costing.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Product Name</label>

                <input
                  value={productName}
                  onChange={(e) =>
                    setProductName(e.target.value)
                  }
                  placeholder="Enter product name"
                />
              </div>

              <div className="form-group">
                <label>Product Size</label>

                <input
                  value={productSize}
                  onChange={(e) =>
                    setProductSize(e.target.value)
                  }
                  placeholder='Example: 8" - 1050 Count'
                />
              </div>

              <div className="form-group">
                <label>SKU / Pack Type</label>

                <input
                  value="Flexi Pack"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Sticks Per Pack</label>

                <input
                  type="number"
                  value={sticksPerPack}
                  onChange={(e) =>
                    setSticksPerPack(
                      Number(e.target.value) || 0
                    )
                  }
                />
              </div>
            </div>

            <div className="product-preview">
              <div className="preview-image">
                <img
                  src="/images/agarbatti.jpg"
                  alt="Agarbatti"
                />
              </div>

              <div className="preview-details">
                <span className="preview-label">
                  CURRENT PRODUCT
                </span>

                <h3>{productName}</h3>

                <p>{productSize}</p>

                <div className="preview-tags">
                  <span>Flexi Pack</span>
                  <span>
                    {sticksPerPack} sticks / pack
                  </span>
                  <span>Machine Made</span>
                </div>
              </div>
            </div>
          </div>
        );

      /* =====================================================
         PREMIX
         ===================================================== */

      case 2:
        return (
          <PremixCosting
            onCostChange={setPremixCost}
            manufacturingExpenses={manufacturingExpenses}
          />
        );

      /* =====================================================
         RAW BATTI
         ===================================================== */

      case 3:
        return (
          <>
            <RawBattiCosting
              premixCost={premixCost}
              onCostChange={setRawBattiCost}
              manufacturingExpenses={manufacturingExpenses}
            />

            <ManufacturingExpenses
              onRawBattiExpensesChange={
                setManufacturingExpenses
              }
            />
          </>
        );

      /* =====================================================
         FRAGRANCE
         ===================================================== */

      case 4:
        return (
          <FragranceCosting
            onCostChange={setFragranceCost}
          />
        );

      /* =====================================================
         DIPPED BATTI
         ===================================================== */

      case 5:
        return (
          <DippedBattiCosting
            rawBattiCost={rawBattiCost}
            fragranceCost={fragranceCost}
            manufacturingExpenses={manufacturingExpenses}
            onCostChange={setDippedBattiCost}
          />
        );

      /* =====================================================
         PACKAGING
         ===================================================== */

      case 6:
        return (
          <PackagingCosting
            dippedBattiCost={dippedBattiCost}
            onCostChange={setFinalCostPerPack}
            onPackSizeChange={setSticksPerPack}
            onPackagingCostChange={setPackagingCost}
          />
        );

      /* =====================================================
         SUMMARY
         ===================================================== */

      case 7:
        return (
          <div className="summary-page">
            <div className="final-cost-card">
              <div>
                <span className="eyebrow">
                  FINAL PRODUCTION COST
                </span>

                <h2>
                  ₹
                  {Number(
                    finalCostPerPack || 0
                  ).toFixed(2)}
                </h2>

                <p>
                  Cost per {sticksPerPack} sticks pack
                </p>
              </div>

              <div className="final-cost-icon">
                <Icon type="summary" size={42} />
              </div>
            </div>

            <div className="content-card">
              <div className="card-heading">
                <div className="heading-icon">
                  <Icon type="summary" size={25} />
                </div>

                <div>
                  <h2>Cost Journey</h2>

                  <p>
                    Complete production cost from premix
                    to packaging.
                  </p>
                </div>
              </div>

              <div className="cost-journey">
                <div className="journey-item">
                  <div className="journey-number">
                    01
                  </div>

                  <div>
                    <strong>Premix</strong>
                    <span>
                      Raw material mixture
                    </span>
                  </div>

                  <b>
                    ₹
                    {Number(
                      premixCost || 0
                    ).toFixed(2)}
                    /kg
                  </b>
                </div>

                <div className="journey-line" />

                <div className="journey-item">
                  <div className="journey-number">
                    02
                  </div>

                  <div>
                    <strong>Raw Batti</strong>
                    <span>
                      Bamboo + premix +
                      manufacturing
                    </span>
                  </div>

                  <b>
                    ₹
                    {Number(
                      rawBattiCost || 0
                    ).toFixed(2)}
                    /kg
                  </b>
                </div>

                <div className="journey-line" />

                <div className="journey-item">
                  <div className="journey-number">
                    03
                  </div>

                  <div>
                    <strong>Fragrance</strong>
                    <span>
                      DEP + concentrated
                      fragrance
                    </span>
                  </div>

                  <b>
                    ₹
                    {Number(
                      fragranceCost || 0
                    ).toFixed(2)}
                    /kg
                  </b>
                </div>

                <div className="journey-line" />

                <div className="journey-item">
                  <div className="journey-number">
                    04
                  </div>

                  <div>
                    <strong>Dipped Batti</strong>
                    <span>
                      Raw batti + fragrance
                    </span>
                  </div>

                  <b>
                    ₹
                    {Number(
                      dippedBattiCost || 0
                    ).toFixed(2)}
                    /kg
                  </b>
                </div>

                <div className="journey-line" />

                <div className="journey-item">
                  <div className="journey-number">
                    05
                  </div>

                  <div>
                    <strong>Packaging</strong>
                    <span>
                      Pouch + secondary +
                      tertiary + labour
                    </span>
                  </div>

                  <b>
                    ₹
                    {Number(
                      packagingCost || 0
                    ).toFixed(2)}
                    /pack
                  </b>
                </div>
              </div>
            </div>

            <div className="summary-bottom-grid">
              <div className="content-card">
                <span className="small-label">
                  PRODUCT
                </span>

                <h3>{productName}</h3>

                <p>{productSize}</p>
              </div>

              <div className="content-card">
                <span className="small-label">
                  PACK SIZE
                </span>

                <h3>
                  {sticksPerPack} Sticks
                </h3>

                <p>Flexi Pack</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-shell">

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Icon type="batti" size={25} />
          </div>

          <div>
            <h1>Agarbatti</h1>
            <span>Costing Studio</span>
          </div>
        </div>

        <div className="sidebar-section-title">
          COSTING JOURNEY
        </div>

        <nav className="step-navigation">
          {steps.map((step, index) => {
            const isActive =
              currentStep === step.number;

            const isCompleted =
              currentStep > step.number;

            return (
              <React.Fragment key={step.number}>
                <button
                  type="button"
                  className={`step-item ${
                    isActive ? "active" : ""
                  } ${
                    isCompleted ? "completed" : ""
                  }`}
                  onClick={() =>
                    goToStep(step.number)
                  }
                >
                  <div className="step-icon">
                    {isCompleted ? (
                      "✓"
                    ) : (
                      <Icon
                        type={stepIcons[index]}
                        size={20}
                      />
                    )}
                  </div>

                  <div className="step-text">
                    <strong>
                      {String(
                        step.number
                      ).padStart(2, "0")}{" "}
                      {step.title}
                    </strong>

                    <span>
                      {step.subtitle}
                    </span>
                  </div>
                </button>

                {index <
                  steps.length - 1 && (
                  <div
                    className={`sidebar-line ${
                      currentStep >
                      step.number
                        ? "filled"
                        : ""
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="mini-production">
            <div className="mini-production-icon">
              <Icon type="batti" size={21} />
            </div>

            <div>
              <strong>
                Production Costing
              </strong>

              <span>
                Step-by-step calculation
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="main-area">

        {/* TOP BAR */}

        <header className="topbar">
          <div>
            <span className="topbar-label">
              PRODUCTION COSTING
            </span>

            <h2>{productName}</h2>
          </div>

          <div className="topbar-product">
            <span>SKU</span>
            <strong>Flexi Pack</strong>
          </div>
        </header>

        {/* ===================================================
            HERO
            =================================================== */}

        <section className="stage-hero">
          <img
            src={stepImages[currentStep]}
            alt={getStepTitle()}
          />

          <div className="hero-overlay" />

          <div className="hero-content">
            <span className="hero-step">
              STEP{" "}
              {String(currentStep).padStart(
                2,
                "0"
              )}{" "}
              OF {steps.length}
            </span>

            <h1>{getStepTitle()}</h1>

            <p>
              {getStepDescription()}
            </p>
          </div>

          <div className="hero-cost">
            <span>CURRENT COST</span>

            <strong>
              ₹{getCurrentCost()}
            </strong>

            <small>
              {getCurrentUnit()}
            </small>
          </div>
        </section>

        {/* ===================================================
            PRODUCTION FLOW
            MOVED ABOVE COSTING CONTENT
            =================================================== */}

        <section className="process-section">
          <div className="process-heading">
            <span>PRODUCTION FLOW</span>

            <h3>
              From bamboo to finished pack
            </h3>
          </div>

          <div className="process-strip">

            <div className="process-card">
              <img
                src="/images/bamboo.jpg"
                alt="Bamboo"
              />

              <div>
                <span>01</span>
                <strong>Bamboo</strong>
              </div>
            </div>

            <div className="process-arrow">
              →
            </div>

            <div className="process-card">
              <img
                src="/images/machine.jpg"
                alt="Machine"
              />

              <div>
                <span>02</span>
                <strong>Machine</strong>
              </div>
            </div>

            <div className="process-arrow">
              →
            </div>

            <div className="process-card">
              <img
                src="/images/workers.jpg"
                alt="Workers"
              />

              <div>
                <span>03</span>
                <strong>Workers</strong>
              </div>
            </div>

            <div className="process-arrow">
              →
            </div>

            <div className="process-card">
              <img
                src="/images/fragrance.jpg"
                alt="Fragrance"
              />

              <div>
                <span>04</span>
                <strong>Fragrance</strong>
              </div>
            </div>

            <div className="process-arrow">
              →
            </div>

            <div className="process-card">
              <img
                src="/images/packaging.jpg"
                alt="Packaging"
              />

              <div>
                <span>05</span>
                <strong>Packaging</strong>
              </div>
            </div>

          </div>
        </section>

        {/* ===================================================
            COSTING CONTENT WITH BACKGROUND IMAGE
            =================================================== */}

        <section
          className="page-content"
          style={{
            "--step-background": `url(${stepImages[currentStep]})`,
          }}
        >
          <div className="page-background-image" />

          <div className="page-content-inner">
            {renderStepContent()}
          </div>
        </section>

        {/* ===================================================
            FOOTER NAVIGATION
            =================================================== */}

        <footer className="bottom-navigation">

          <button
            type="button"
            className="back-button"
            onClick={previousStep}
            disabled={currentStep === 1}
          >
            <span className="nav-arrow">
              ←
            </span>

            <span className="nav-text">
              <small>PREVIOUS</small>
              Back
            </span>
          </button>

          <div className="progress-info">

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    (currentStep /
                      steps.length) *
                    100
                  }%`,
                }}
              />
            </div>

            <span>
              Step {currentStep} of{" "}
              {steps.length}
            </span>
          </div>

          {currentStep <
          steps.length ? (
            <button
              type="button"
              className="continue-button"
              onClick={nextStep}
            >
              <span className="nav-text">
                <small>NEXT STEP</small>
                Continue
              </span>

              <span className="nav-arrow">
                →
              </span>
            </button>
          ) : (
            <button
              type="button"
              className="continue-button"
              onClick={() =>
                goToStep(1)
              }
            >
              <span className="nav-text">
                <small>START AGAIN</small>
                New Costing
              </span>

              <span className="nav-arrow">
                ↻
              </span>
            </button>
          )}

        </footer>
      </main>
    </div>
  );
}

export default App;