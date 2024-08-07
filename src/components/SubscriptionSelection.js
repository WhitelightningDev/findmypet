import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

const SubscriptionSelection = () => {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const baseURL = 'https://findmypet-df0a76e6b00e.herokuapp.com/api/subscription'; // Updated URL

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get(`${baseURL}/plans`);

                console.log('API Response:', response.data);

                if (Array.isArray(response.data)) {
                    setPlans(response.data);
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (err) {
                setError('Failed to load subscription plans');
                console.error('Error fetching plans:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    useEffect(() => {
        const loadPaypalScript = () => {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=AQe6zOU32RCoZ_aCGeHRtvzKodFvsoJRcgJAhfu6k95txVC4uC2WN79aNUYqdWbgcue00I6IBca8mrt2&vault=true&intent=subscription`;
            script.async = true;
            script.onload = () => {
                window.paypal.Buttons({
                    style: {
                        shape: 'rect',
                        color: 'gold',
                        layout: 'horizontal',
                        label: 'subscribe'
                    },
                    createSubscription: function(data, actions) {
                        return actions.subscription.create({
                            plan_id: selectedPlan
                        });
                    },
                    onApprove: function(data, actions) {
                        fetch(`${baseURL}/subscribe`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ planId: selectedPlan })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.approval_url) {
                                window.location.href = data.approval_url;
                            } else {
                                alert('Subscription was created successfully.');
                                navigate('/dashboard');
                            }
                        })
                        .catch(err => {
                            console.error('Error notifying backend:', err);
                            setError('Failed to complete subscription');
                        });
                    }
                }).render('#paypal-button-container');
            };

            document.body.appendChild(script);
        };

        if (selectedPlan) {
            loadPaypalScript();
        }
    }, [selectedPlan, baseURL, navigate]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <FaSpinner className="spinner-border text-primary" role="status" />
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger d-flex align-items-center">
                    <FaExclamationTriangle className="me-2" />
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Select a Subscription Plan</h2>
            <div className="row">
                {plans.length > 0 ? (
                    plans.map((plan) => {
                        if (!plan.id) {
                            console.error('Plan missing id:', plan);
                            return null;
                        }
                        return (
                            <div key={plan.id} className="col-md-6 mb-4">
                                <div 
                                    className={`card shadow-sm ${selectedPlan === plan.id ? 'border-primary' : ''}`} 
                                    onClick={() => setSelectedPlan(plan.id)} 
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title">{plan.name}</h5>
                                        <p className="card-text">
                                            Initial Payment: R{plan.initialPayment}<br />
                                            Monthly Payment: R{plan.monthlyPayment}
                                        </p>
                                        {selectedPlan === plan.id && (
                                            <div>
                                                <h6>Subscription Details</h6>
                                                <p>Plan Name: {plan.name}</p>
                                                <p>Initial Payment: R{plan.initialPayment}</p>
                                                <p>Monthly Payment: R{plan.monthlyPayment}</p>
                                                <div id="paypal-button-container" className="mt-3"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No subscription plans available.</p>
                )}
            </div>
            <div className="container">
                <p>Once you have made payment you will be redirected back to the home page where you will see a button </p>
            </div>
        </div>
    );
};

export default SubscriptionSelection;
