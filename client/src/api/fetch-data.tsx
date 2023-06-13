export const fetchDashboardData = async () => {

    const clientResponse = await fetch("/clients").then(
        response => response.json()
      ).then(
        data => {
          return data
        }
      )

      const jobsResponse = await fetch("/jobs").then(
        response => response.json()
      ).then(
        data => {
          return data
        }
      )

    return {clientResponse, jobsResponse}
}

export const fetchJobsData = async () => {

  const jobsResponse = await fetch("/jobs").then(
      response => response.json()
    ).then(
      data => {
        return data
      }
    )

    const materialsResponse = await fetch("/materials").then(
      response => response.json()
    ).then(
      data => {
        return data
      }
    )

    const laborResponse = await fetch("/labor").then(
      response => response.json()
    ).then(
      data => {
        return data
      }
    )

  return {jobsResponse, materialsResponse, laborResponse}
}

export const fetchMaterialsAddData = async (name) => {

  const materialsAddResponse = await fetch(name).then(
      response => response.json()
    ).then(
      data => {
        return data
      }
    )


  return {materialsAddResponse}
}