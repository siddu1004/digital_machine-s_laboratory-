"""
Physics vs AI/ML Benchmarking and Digital Twin Insight Module.
Trains Polynomial Regression, Random Forest, and Multi-Layer Perceptron (MLP) on experimental/synthetic datasets.
Performs rigorous train/test splitting, reports true out-of-sample generalization metrics (MAE, RMSE, R²),
and compares instantaneous physics predictions against machine learning predictions with residual errors.
"""

import numpy as np
from typing import Dict, Any, List, Tuple
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.neural_network import MLPRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

class DigitalTwinMLEvaluator:
    def __init__(self):
        self.version = "1.2.0-academic"
        self.poly_model = None
        self.poly_transform = None
        self.rf_model = None
        self.mlp_model = None
        self.scaler_x = StandardScaler()
        self.scaler_y = StandardScaler()
        self.metrics: Dict[str, Dict[str, float]] = {}
        self.is_trained = False

    def train_models(self, X: np.ndarray, y: np.ndarray) -> Dict[str, Any]:
        """
        Trains Polynomial, Random Forest, and MLP models using an 80/20 train/test split.
        X features: [V_line, slip, frequency]
        y target: [I_line, P_in, Torque, Efficiency]
        """
        # Strict train/test split (80% train, 20% test)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)

        # 1. Polynomial Regression (degree 2)
        self.poly_transform = PolynomialFeatures(degree=2, include_bias=False)
        X_poly_train = self.poly_transform.fit_transform(X_train)
        X_poly_test = self.poly_transform.transform(X_test)
        self.poly_model = LinearRegression()
        self.poly_model.fit(X_poly_train, y_train)
        y_pred_poly = self.poly_model.predict(X_poly_test)

        # 2. Random Forest Regressor
        self.rf_model = RandomForestRegressor(n_estimators=15, max_depth=6, random_state=42)
        self.rf_model.fit(X_train, y_train)
        y_pred_rf = self.rf_model.predict(X_test)

        # 3. Multi-Layer Perceptron Regressor
        X_train_scaled = self.scaler_x.fit_transform(X_train)
        X_test_scaled = self.scaler_x.transform(X_test)
        self.mlp_model = MLPRegressor(hidden_layer_sizes=(16, 8), max_iter=800, random_state=42)
        self.mlp_model.fit(X_train_scaled, y_train)
        y_pred_mlp = self.mlp_model.predict(X_test_scaled)

        # Compute true out-of-sample metrics
        self.metrics = {
            "Polynomial_Regression": {
                "MAE": float(mean_absolute_error(y_test, y_pred_poly)),
                "RMSE": float(np.sqrt(mean_squared_error(y_test, y_pred_poly))),
                "R2": float(r2_score(y_test, y_pred_poly))
            },
            "Random_Forest": {
                "MAE": float(mean_absolute_error(y_test, y_pred_rf)),
                "RMSE": float(np.sqrt(mean_squared_error(y_test, y_pred_rf))),
                "R2": float(r2_score(y_test, y_pred_rf))
            },
            "MLP_Neural_Network": {
                "MAE": float(mean_absolute_error(y_test, y_pred_mlp)),
                "RMSE": float(np.sqrt(mean_squared_error(y_test, y_pred_mlp))),
                "R2": float(r2_score(y_test, y_pred_mlp))
            }
        }
        self.is_trained = True
        return self.metrics

    def compare_physics_vs_ml(
        self,
        physics_output: Dict[str, Any],
        v_line: float,
        slip: float,
        frequency: float
    ) -> Dict[str, Any]:
        """
        Calculates side-by-side comparison between physics and ML prediction with absolute and percentage residuals.
        """
        if not self.is_trained or not self.poly_model:
            return {"status": "untrained"}

        x_input = np.array([[v_line, slip, frequency]])
        x_poly = self.poly_transform.transform(x_input)
        x_scaled = self.scaler_x.transform(x_input)

        # Target: Current, Power_in, Torque, Efficiency
        pred_poly = self.poly_model.predict(x_poly)[0]
        pred_rf = self.rf_model.predict(x_input)[0]
        pred_mlp = self.mlp_model.predict(x_scaled)[0]

        # Use Random Forest as primary ML comparison
        phys_i = float(physics_output.get("i_line", 0.0))
        ml_i = float(pred_rf[0])
        diff_i = ml_i - phys_i
        err_pct_i = (abs(diff_i) / phys_i * 100.0) if phys_i > 0 else 0.0

        phys_t = float(physics_output.get("torque_nm", physics_output.get("t_shaft", 0.0)))
        ml_t = float(pred_rf[2]) if len(pred_rf) > 2 else 0.0
        diff_t = ml_t - phys_t
        err_pct_t = (abs(diff_t) / phys_t * 100.0) if phys_t > 0 else 0.0

        return {
            "comparison": {
                "current": {
                    "physics": round(phys_i, 2),
                    "ml_predicted": round(ml_i, 2),
                    "residual": round(diff_i, 2),
                    "error_pct": round(err_pct_i, 2),
                    "unit": "A"
                },
                "torque": {
                    "physics": round(phys_t, 2),
                    "ml_predicted": round(ml_t, 2),
                    "residual": round(diff_t, 2),
                    "error_pct": round(err_pct_t, 2),
                    "unit": "Nm"
                }
            },
            "validation_metrics": self.metrics,
            "disclaimer": "Machine Learning predictions are statistical surrogates and do NOT substitute physical Maxwellian conservation equations."
        }
