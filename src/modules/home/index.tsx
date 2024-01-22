import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CandidateBlock from "../../components/blocks/candidate-block";
import CandidateCard from "../../components/card/candidate-card";
import Header from "../../components/header";
import GridLayout from "../../layouts/grid-layout";
import * as CandidatesService from "../../service/candidates";

interface CandidateType {
  candidate_id: 1;
  name: string;
  phone: string;
  email: string;
  qualification: string;
  current_status: string;
  expected_salary: number;
  computed_score: number;
  candidate_created_at: string;
  candidate_updated_at: string;
}

interface CandidateListByStus {
  status: string;
  candidates: CandidateType[];
}

const Home = (): React.JSX.Element => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [candidateListByStatus, setCandidateListByStatus] = useState<any>([]);

  const getAllCandidates = async () => {
    await CandidatesService.getAllCandidates(
      "/candidates",
      (data: any) => {
        setCandidates(data?.data?.candidates);
      },
      (err: any) => {
        console.log("Error on fetching Candidates:", err);
      }
    );
  };

  useEffect(() => {
    getAllCandidates();
  }, []);

  useEffect(() => {
    let candidateStatus: string[] = [
      "CONTACTED",
      "INTERVIEW_SCHEDULED",
      "OFFER_EXTENDED",
      "HIRED",
      "REJECTED",
    ];
    const CandidateListByStatus = candidateStatus.map((item: any) => {
      const candidatesWithStatus = candidates.filter(
        (data: any) => data?.current_status === item
      );

      return {
        status: item,
        candidates: candidatesWithStatus,
      };
    });
    console.log(candidateListByStatus, "data");
    setCandidateListByStatus(CandidateListByStatus);
  }, [candidates]);

  return (
    <React.Fragment>
      <Header />
      <section className="px-4 md:px-8 lg:py-4 lg:px-16">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Candidate Dashboard</h1>
          <button
            className="bg-slate-700 text-white py-3 px-6 rounded-md text-sm flex items-center"
            onClick={() => navigate("/add")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="ml-2">Add new candidate</span>
          </button>
        </div>
        <GridLayout>
          {candidateListByStatus?.map((item: any, index: number) => (
            <CandidateBlock
              key={index}
              heading={item.status}
              showData={item?.candidates?.length > 0}
            >
              {item.candidates?.map((data: any, idx: number) => (
                <CandidateCard key={idx} {...data} fetch={getAllCandidates} />
              ))}
            </CandidateBlock>
          ))}
        </GridLayout>
      </section>
    </React.Fragment>
  );
};

export default Home;
