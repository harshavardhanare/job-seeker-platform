const JobSeeker = require("../models/JobSeeker")
const Job = require("../models/Job")
const JobApplicant = require("../models/JobApplicant")

/**
 * Registers a new job seeker.
 * Saves the job seeker details to the database.
 */
const insertjobseeker = async (request, response) => {
    try 
    {
      const input = request.body;
      const jobseeker = new JobSeeker(input);
      await jobseeker.save();
      response.status(200).send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
};

/**
 * Updates the job seeker profile.
 * Finds the job seeker by email and updates the provided fields.
 */
const updatejobseekerprofile = async (request, response) => 
{
    try 
    {
      const input = request.body;
      const email = input.email; 
      const jobseeker = await JobSeeker.findOne({ email });
      if (!jobseeker) 
      {
        response.status(200).send('Job seeker not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          jobseeker[key] = input[key];
        }
      }
      await jobseeker.save();
      response.status(200).send("Job Seeker Profile Updated Successfully");
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
};

/**
 * Checks job seeker login credentials.
 * Returns job seeker details if authentication is successful.
 */
const checkjobseekerlogin = async (request, response) => 
{
     try 
     {
       const input = request.body
       const jobseeker = await JobSeeker.findOne(input)
       response.json(jobseeker)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
};

/**
 * Retrieves the job seeker profile by email.
 * Returns job seeker details if found.
 */
const jobseekerprofile = async (request, response) => 
{
    try 
    {
      const email = request.params.email
      const jobseeker = await JobSeeker.findOne({email})
      if(jobseeker)
      {
        response.json(jobseeker)
      }
      else
      {
        return response.status(200).send('Job seeker not found with the provided email id');
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
};

/**
 * Retrieves all available job listings.
 * Returns a list of jobs or a message if no jobs are found.
 */
const viewjobsbyjobseeker = async (request, response) => 
{
    try 
    {
      const jobs = await Job.find();
      if(jobs.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(jobs);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
};

/**
 * Retrieves the jobs applied by a job seeker using their email.
 * Returns a list of applied jobs or a message if no applications are found.
 */
const appliedjobs = async (request, response) => 
{
    try 
    {
      const email = request.params.email
      const appliedjobs = await JobApplicant.find({"jobseekeremail":email});
      if(appliedjobs.length==0)
      {
        response.status(200).send("DATA NOT FOUND");
      }
      else
      {
        response.json(appliedjobs);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
};

/**
 * Allows a job seeker to apply for a job.
 * Checks if the job seeker has already applied before submitting the application.
 */
const applyjob = async (request, response) => {
    try 
    {
      const input = request.body; // job id and job seeker email id
      const alreadyapplied = await JobApplicant.findOne(input)
      if(!alreadyapplied)
      {
        const jobapplicant = new JobApplicant(input);
        await jobapplicant.save();
        response.status(200).send('Job Applied Successfully');
      }
      else
      {
        response.status(200).send('OOPS ... You have already applied for this Job');
      }
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
};

module.exports = {insertjobseeker, checkjobseekerlogin, updatejobseekerprofile, jobseekerprofile, viewjobsbyjobseeker, applyjob, appliedjobs}
