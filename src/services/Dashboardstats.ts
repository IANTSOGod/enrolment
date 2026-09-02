export async function Dashboardstats(): Promise<Dashboardinterface> {
  const data = {
    stats: {
      enrolmentsToday: 42,
      pendingSync: 15,
    },

    recentActivity: [
      {
        id: 1,
        applicantName: "Jean Dupont",
        reference: "REQ-2023-8921",
        time: "10:45 AM",
        status: "synced",
      },
      {
        id: 2,
        applicantName: "Marie Curie",
        reference: "REQ-2023-8922",
        time: "11:12 AM",
        status: "local-only",
      },
      {
        id: 3,
        applicantName: "Omar Sy",
        reference: "REQ-2023-8923",
        time: "11:58 AM",
        status: "local-only",
      },
    ],
  };
  return data as Dashboardinterface;
}
