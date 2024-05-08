import { NextResponse } from "next/server";
import calculate, { Team, Match } from "../../../utils/calculator"; // Adjust import path as necessary

// Named export for the POST method
export async function POST(req, res) {
  try {
    const data = await req.json();
    console.log("Data: ", data);

    // Create the teams map from the JSON points data
    const teams = data.points.reduce(
      (acc, [name, gamesPlayed, wins, losses, points, netRunRate]) => {
        acc[name] = new Team(
          name,
          gamesPlayed,
          wins,
          losses,
          points,
          netRunRate
        );
        return acc;
      },
      {}
    );

    // Create the matches array from the JSON matches data
    const matches = data.matches.map(
      ([team1, team2]) => new Match(team1, team2)
    );

    // Calculate the probabilities using the imported function
    const results = await calculate(teams, matches);
    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Optionally handle other methods, for example:
export function GET(req, res) {
  return NextResponse.json({ error: "Method Not allowed" }, { status: 405 });
}
