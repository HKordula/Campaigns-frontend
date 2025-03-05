import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getPredefinedKeywords, addCampaign, getCampaign, updateCampaign } from "../services/CampaignService";
import { useNavigate, useParams } from "react-router-dom";


const CampaignComponent = () => {
    const [campaignName, setCampaignName] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [availableKeywords, setAvailableKeywords] = useState([]);
    const [bidAmount, setBidAmount] = useState(1);
    const [campaignFund, setCampaignFund] = useState(100);
    const [status, setStatus] = useState("");
    const [town, setTown] = useState("");
    const [radius, setRadius] = useState(10);

    const { id } = useParams();
    const [error, setError] = useState({
        campaignName: "",
        keywords: "",
        bidAmount: "",
        campaignFund: "",
        status: "",
        town: "",
        radius: ""
    });

    const navigator = useNavigate();

    useEffect(() => {
        getPredefinedKeywords()
            .then(response => {
                setAvailableKeywords(response.data.map(keyword => ({ value: keyword, label: keyword })));
            })
            .catch(error => console.error("Error fetching keywords:", error));

        if (id) {
            getCampaign(id).then(response => {
                setCampaignName(response.data.campaignName);
                setKeywords(response.data.keywords.map(k => ({ value: k, label: k }))); // Convert for react-select
                setBidAmount(response.data.bidAmount);
                setCampaignFund(response.data.campaignFund);
                setStatus(response.data.status);
                setTown(response.data.town);
                setRadius(response.data.radius);
            }).catch(error => console.error("Error fetching campaign:", error));
        }
    }, [id]);

    function saveOrUpdateCampaign(e) {
        e.preventDefault();

        if (validateForm()) {

            const campaign = { campaignName, keywords: keywords.map(k => k.value), bidAmount, campaignFund, status, town, radius };
            console.log(campaign);

            if(id) {
                updateCampaign(id, campaign).then(response => {
                    console.log(response);
                    navigator('/campaigns');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                addCampaign(campaign).then(response => {
                    console.log(response);
                    navigator('/campaigns');
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = { ...error };

        if (campaignName.trim()) {
            errorsCopy.campaignName = "";
        } else {
            errorsCopy.campaignName = "Campaign Name is required";
            valid = false;
        }

        if (keywords.length > 0) {
            errorsCopy.keywords = "";
        } else {
            errorsCopy.keywords = "At least one keyword is required";
            valid = false;
        }

        if (bidAmount >= 1) {
            errorsCopy.bidAmount = "";
        } else {
            errorsCopy.bidAmount = "Bid Amount should be greater than 1";
            valid = false;
        }

        if (campaignFund >= 100) {
            errorsCopy.campaignFund = "";
        } else {
            errorsCopy.campaignFund = "Campaign Fund should be greater than 100";
            valid = false;
        }

        if (status.trim()) {
            errorsCopy.status = "";
        } else {
            errorsCopy.status = "Status is required";
            valid = false;
        }

        if (town.trim()) {
            errorsCopy.town = "";
        } else {
            errorsCopy.town = "Town is required";
            valid = false;
        }

        if (radius >= 10) {
            errorsCopy.radius = "";
        } else {
            errorsCopy.radius = "Radius should be greater than 10";
            valid = false;
        }

        setError(errorsCopy);

        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center mt-3">Update Campaign</h2>;
        } else {
            return <h2 className="text-center mt-3">Add Campaign</h2>;
        }
    }

    return (
        <div className="container">
            <br />
            <br />
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label>Campaign Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Campaign Name"
                                    name="campaignName"
                                    value={campaignName}
                                    className={`form-control ${error.campaignName ? 'is-invalid' : ''}`}
                                    onChange={e => setCampaignName(e.target.value)}
                                />
                                {error.campaignName && <div className="invalid-feedback">{error.campaignName}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label>Keywords:</label>
                                <Select
                                    options={availableKeywords}
                                    isMulti
                                    value={keywords}
                                    onChange={setKeywords} 
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                                {error.keywords && <div className="text-danger">{error.keywords}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label>Bid Amount: (in zł)</label>
                                <input
                                    type="number"
                                    placeholder="Enter Bid Amount"
                                    name="bidAmount"
                                    value={bidAmount}
                                    min="1"
                                    className={`form-control ${error.bidAmount ? 'is-invalid' : ''}`}
                                    onChange={e => setBidAmount(e.target.value)}
                                />
                                {error.bidAmount && <div className="invalid-feedback">{error.bidAmount}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label>Campaign Fund: (in zł)</label>
                                <input
                                    type="number"
                                    placeholder="Enter Campaign Fund"
                                    name="campaignFund"
                                    value={campaignFund}
                                    min="100"
                                    className={`form-control ${error.campaignFund ? 'is-invalid' : ''}`}
                                    onChange={e => setCampaignFund(e.target.value)}
                                />
                                {error.campaignFund && <div className="invalid-feedback">{error.campaignFund}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label>Status:</label>
                                <select
                                    name="status"
                                    value={status}
                                    className={`form-control ${error.status ? 'is-invalid' : ''}`}
                                    onChange={e => setStatus(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="On">On</option>
                                    <option value="Off">Off</option>
                                </select>
                                {error.status && <div className="invalid-feedback">{error.status}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label>Town:</label>
                                <select
                                    name="town"
                                    value={town}
                                    className={`form-control ${error.town ? 'is-invalid' : ''}`}
                                    onChange={e => setTown(e.target.value)}
                                >
                                    <option value="">Select Town</option>
                                    <option value="Kraków">Kraków</option>
                                    <option value="Warszawa">Warszawa</option>
                                    <option value="Wrocław">Wrocław</option>
                                </select>
                                {error.town && <div className="invalid-feedback">{error.town}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label>Radius: (in km)</label>
                                <input
                                    type="number"
                                    placeholder="Enter Radius"
                                    name="radius"
                                    value={radius}
                                    min="10"
                                    className={`form-control ${error.radius ? 'is-invalid' : ''}`}
                                    onChange={e => setRadius(e.target.value)}
                                />
                                {error.radius && <div className="invalid-feedback">{error.radius}</div>}
                            </div>
                            <div className="text-center">
                                <button className="btn btn-success" onClick={saveOrUpdateCampaign}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignComponent;