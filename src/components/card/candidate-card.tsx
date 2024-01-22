import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as CandidateService from "../../service/candidates";

interface CandidateCardProps {
  candidate_id: number;
  name: string;
  phone: string;
  email: string;
  qualification: string;
  expected_salary: number;
  computed_score: number;
  fetch: any;
}

const CandidateCard = ({
  candidate_id,
  name,
  email,
  phone,
  qualification,
  expected_salary,
  computed_score,
  fetch,
}: CandidateCardProps): React.JSX.Element => {
  const handleDelete = async () => {
    await CandidateService.deleteCandidate(
      `/candidates/${candidate_id}`,
      (data: any) => {
        fetch();
      },
      (err: any) => {}
    );
  };

  return (
    <details className="bg-white py-4 my-4 shadow">
      <summary className="cursor-pointer flex items-center justify-between p-4 py-2">
        <div className="flex items-center">
          <p className="w-10 text-center h-11 p-2 text-lg rounded-full bg-blue-500 text-white mr-3">
            M
          </p>
          <div>
            <p className="text-xl">{name}</p>
            <p className="text-sm">{qualification}</p>
          </div>
        </div>

        <div className="">
          <Link to={`/add?candidateId=${candidate_id}`}>
            <button
              className="text-gray-500 hover:text-gray-700 mr-4"
              onClick={() => {}}
            >
              <FiEdit className="w-4 h-4" />
            </button>
          </Link>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={handleDelete}
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </summary>
      <div className="pl-16 pt-2 border-t-2">
        <p>{email}</p>
        <p>{phone}</p>
        <p>{expected_salary}</p>
        <p>
          Score:{" "}
          <span className="bg-green-500 text-white p-1 text-xs rounded-full">
            {computed_score}
          </span>
        </p>
      </div>
    </details>
  );
};

export default CandidateCard;
