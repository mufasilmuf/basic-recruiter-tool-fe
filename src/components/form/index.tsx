import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";

import * as SkillsService from "../../service/skills";
import * as CandidatesService from "../../service/candidates";
import Modal from "../modal";

interface Skills {
  id: number;
  value: string;
}

interface CandidateFormInput {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  currentStatus: string;
  expectedSalary: number;
  skillIds: number[];
}

interface SkillDataType {
  candidateId: number;
  skillId: number;
  experience: number | string;
}

const regux = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneNumber: /^\d{10}$/,
  onlyNumbers: /^\d+$/,
  alphabets: /^[A-Za-z\s]+$/,
  qualification: /^[A-Za-z\s&\-/]+$/,
};

const CandidateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CandidateFormInput>();
  const [skills, setSkills] = useState<Skills[]>([]);
  const [open, setOpen] = useState(false);
  const [candidateSkills, setCandidateSkills] = useState<
    {
      id: number;
      name: string;
    }[]
  >([
    { id: 1, name: "rect" },
    { id: 2, name: "node" },
  ]);
  const [skillData, setSkillData] = useState<SkillDataType[]>([]);
  const [id, setId] = useState(0);
  const [error, setError] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const candidateId = searchParams.get("candidateId");
  const navigate = useNavigate();

  const getAllSkills = async () => {
    await SkillsService.getAllSkills(
      "/skills",
      (data: any) => {
        const skills = data?.data?.skills.map((data: any) => ({
          value: data.id,
          label: data.name,
        }));
        setSkills(skills);
      },
      (err: any) => {
        console.log("Error fetching skills:", err);
      }
    );
  };

  const getCandidateById = async (candidateId: number) => {
    await CandidatesService.getCandidateById(
      `/candidates/${candidateId}`,
      (data: any) => {
        const candidateData = data?.data?.candidates;

        if (candidateData) {
          setValue("name", candidateData.name);
          setValue("email", candidateData.email);
          setValue("phone", candidateData.phone);
          setValue("qualification", candidateData.qualification);
          setValue("currentStatus", candidateData.current_status);
          setValue("expectedSalary", candidateData.expected_salary);

          // Handle skills data if needed (assuming it's an array of skill IDs)
          //   if (Array.isArray(candidateData.skills)) {
          //     const skillValues = candidateData.skills.map((skill: any) => ({
          //       value: skill.skill_id,
          //       label: skill.name,
          //     }));
          //     setValue("skills", skillValues);
          //   }
        }
      },
      (err: any) => {
        console.log("Error fetching skills:", err);
      }
    );
  };

  const getCandidateSkills = async (candidateId: number) => {
    await SkillsService.getCandidateSkills(
      `/candidates-skills/${candidateId}`,
      (data: any) => {
        const skills = data?.data?.candidateSkills;
        setCandidateSkills(skills);
      },
      (err: any) => {
        console.log("Error fetching skills:", err);
      }
    );
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  const onSubmit: SubmitHandler<CandidateFormInput> = async (fromData) => {
    if (Number(candidateId) > 0) {
      await CandidatesService.updateCandidates(
        `/candidates/${candidateId}`,
        fromData,
        async (data: any) => {
          reset();
          navigate("/");
        },
        (err: any) => {
          console.log("Error fetching skills:", err);
        }
      );

      return;
    }

    await CandidatesService.addNewCandidates(
      "/candidates",
      fromData,
      async (data: any) => {
        reset();
        setOpen(true);
        await getCandidateSkills(data?.data?.candidateId);
        setId(data?.data?.candidateId);
      },
      (err: any) => {
        console.log("Error fetching skills:", err);
      }
    );
  };

  const changeExperience = (value: any, skillId: number) => {
    let newExperience = {
      candidateId: id,
      skillId: skillId,
      experience: value,
    };
    setSkillData((prev) => [...prev, newExperience]);
  };

  const handleSubmitExperience = async (e: any) => {
    e.preventDefault();
    if (candidateSkills.length === skillData.length) {
      console.log(skillData);
      await SkillsService.addCandidateSkills(
        "/candidates-skills",
        { skillData: skillData },
        (data: any) => {
          navigate("/");
        },
        (err: any) => {
          console.log(err);
        }
      );
      setError(false);
      setSkillData([]);
      setOpen(false);
    } else {
      setError(true);
      setSkillData([]);
    }
  };

  useEffect(() => {
    if (candidateId) {
      getCandidateById(Number(candidateId));
    }
  }, [candidateId]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl mb-4">Add New Candidates</h1>
      <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4 bg-gray-100 p-6 shadow">
        <div className="mb-6">
          <input
            type="text"
            {...register("name", {
              required: "Name is required.",
              pattern: {
                value: regux.alphabets,
                message: "Name should have only alphabets.",
              },
              minLength: {
                value: 4,
                message: "Name should have minimun 4 characters.",
              },
            })}
            placeholder="Name"
            className={`h-12 w-full rounded p-2 ${
              errors.name && "border-red-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm absolute">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: regux.email,
                message: "Email is invalid.",
              },
            })}
            placeholder="Email"
            className={`h-12 w-full rounded p-2 ${
              errors.email && "border-red-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm absolute">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            {...register("phone", {
              required: "Phone number is required.",
              pattern: {
                value: regux.phoneNumber,
                message: "Phone number is invalid.",
              },
            })}
            placeholder="Phone"
            className={`h-12 w-full rounded p-2 ${
              errors.phone && "border-red-500"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm absolute">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            {...register("qualification", {
              required: "Qualification is required.",
              minLength: {
                value: 2,
                message: "Qualification should have minimun 2 characters.",
              },
            })}
            placeholder="Qualification"
            className={`h-12 w-full rounded p-2 ${
              errors.qualification && "border-red-500"
            }`}
          />
          {errors.qualification && (
            <p className="text-red-500 text-sm absolute">
              {errors.qualification.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <select
            {...register("currentStatus", {
              required: "Current Status is required.",
            })}
            className={`h-12 w-full rounded p-2 ${
              errors.currentStatus && "border-red-500"
            }`}
          >
            <option value="CONTACTED">Contacted</option>
            <option value="INTERVIEW_SCHEDULED">Interview Scheduled</option>
            <option value="OFFER_EXTENDED">Offer Extended</option>
            <option value="HIRED">Hired</option>
            <option value="REJECTED">Rejected</option>
          </select>
          {errors.currentStatus && (
            <p className="text-red-500 text-sm absolute">
              {errors.currentStatus.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="number"
            {...register("expectedSalary", {
              required: "Expected salary is required.",
              pattern: {
                value: regux.onlyNumbers,
                message: "Enter a valid salary.",
              },
              minLength: {
                value: 5,
                message: "Salary should have minimum 5 characters.",
              },
            })}
            placeholder="Expected Salary"
            className={`h-12 w-full rounded p-2 ${
              errors.expectedSalary && "border-red-500"
            }`}
          />
          {errors.expectedSalary && (
            <p className="text-red-500 text-sm absolute">
              {errors.expectedSalary.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <Select
            isMulti
            options={skills}
            {...register("skillIds", {
              required: "Skills are required",
              setValueAs: (options: any[]) =>
                options.map((option) => option.value),
            })}
            className={`rounded ${errors.skillIds && "border-red-500"}`}
            isClearable
            onChange={(selectedOption: any) =>
              setValue("skillIds", selectedOption || [])
            }
            components={{
              DropdownIndicator: () => null,
            }}
          />
          {errors.skillIds && (
            <p className="text-red-500 text-sm absolute">
              {errors.skillIds.message}
            </p>
          )}
        </div>
      </section>
      <div className="mt-6">
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save Candidate
          </button>
        </div>
      </div>
      <Modal
        isOpen={open}
        setOpen={() => setOpen(!open)}
        action={handleSubmitExperience}
      >
        <form className="border px-12 py-3" onSubmit={handleSubmitExperience}>
          {candidateSkills?.map((skill, index) => (
            <div key={index}>
              <label className="text-lg capitalize">{skill.name}: </label>
              <input
                type="number"
                required
                onChange={(e) => changeExperience(e.target.value, skill.id)}
                className="border p-1 ml-2 rounded mb-2"
              />
            </div>
          ))}
          {error && (
            <p className="text-red-600">
              Experience for all skill is required.
            </p>
          )}
        </form>
      </Modal>
    </form>
  );
};

export default CandidateForm;
