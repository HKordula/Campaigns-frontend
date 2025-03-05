import React, { useEffect, useState } from "react";
import { deleteCampaign as deleteCampaignService, listCampaigns } from "../services/CampaignService";
import { useNavigate } from "react-router-dom";

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const campaignsPerPage = 11;
    const navigator = useNavigate();

    useEffect(() => {
        getCampaigns();
    }, []);

    function getCampaigns() {
        listCampaigns()
            .then(response => {
                setCampaigns(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function addNewCampaign() {
        navigator('/campaigns/add');
    }

    function updateCampaign(id) {
        navigator(`/campaigns/update/${id}`);
    }

    function handleDeleteCampaign(id) {
        console.log(id);

        deleteCampaignService(id)
            .then(response => {
                console.log(response);
                getCampaigns();
            })
            .catch(error => {
                console.error(error);
            });
    }

    const indexOfLastCampaign = currentPage * campaignsPerPage;
    const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
    const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);
    const totalPages = Math.ceil(campaigns.length / campaignsPerPage);

    return (
        <div className="container">
            <h2 className="text-center mt-3 mb-3">Campaign List</h2>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th className="text-center">Name</th>
                        <th className="text-center">Keywords</th>
                        <th className="text-center">Bid Amount (in zł)</th>
                        <th className="text-center">Campaign Fund (in zł)</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Town</th>
                        <th className="text-center">Radius (in km)</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCampaigns.map(campaign => (
                        <tr key={campaign.id}>
                            <td className="text-center">{campaign.campaignName}</td>
                            <td className="text-center">{campaign.keywords}</td>
                            <td className="text-center">{campaign.bidAmount}</td>
                            <td className="text-center">{campaign.campaignFund}</td>
                            <td className="text-center">{campaign.status}</td>
                            <td className="text-center">{campaign.town}</td>
                            <td className="text-center">{campaign.radius}</td>
                            <td className="text-center">
                                <button className="btn btn-info me-2" onClick={() => updateCampaign(campaign.id)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteCampaign(campaign.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary mb-2" onClick={addNewCampaign}>Add Campaign</button>
                <div>
                    <button
                        className="btn btn-secondary me-2"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignList;