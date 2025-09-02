import type GameStats from '../models/GameStats';
import type PlayerStats from '../models/PlayerStats';

import team_BJOERN_vs_team_Cuuurl_mirage from '../assets/json/team_BJOERN-vs-team_Cuuurl-mirage.json';
import team_BJOERN_vs_team_Cuuurl_dust2 from '../assets/json/team_BJOERN-vs-team_Cuuurl-dust2.json';

const gameStats: GameStats[] = [];

gameStats.push(team_BJOERN_vs_team_Cuuurl_mirage as unknown as GameStats);
gameStats.push(team_BJOERN_vs_team_Cuuurl_dust2 as unknown as GameStats);

export function extractGameStats(team1: number, team2: number, map: string): PlayerStats[]|null {
    const mapStats = gameStats.find(gs => (gs.map === map.toLowerCase() && gs.team1 === team1 && gs.team2 === team2));

    if (!mapStats) return null;

    // Transform raw data to GameStats structure
    return mapStats.stats.map((player: any) => ({
        matchid: player.matchid,
        mapnumber: player.mapnumber,
        steamid64: player.steamid64,
        team: player.team,
        name: player.name,
        kills: player.kills,
        deaths: player.deaths,
        damage: player.damage,
        assists: player.assists,
        enemy5ks: player.enemy5ks,
        enemy4ks: player.enemy4ks,
        enemy3ks: player.enemy3ks,
        enemy2ks: player.enemy2ks,
        utility_count: player.utility_count,
        utility_damage: player.utility_damage,
        utility_successes: player.utility_successes,
        utility_enemies: player.utility_enemies,
        flash_count: player.flash_count,
        flash_successes: player.flash_successes,
        health_points_removed_total: player.health_points_removed_total,
        health_points_dealt_total: player.health_points_dealt_total,
        shots_fired_total: player.shots_fired_total,
        shots_on_target_total: player.shots_on_target_total,
        v1_count: player.v1_count,
        v1_wins: player.v1_wins,
        v2_count: player.v2_count,
        v2_wins: player.v2_wins,
        entry_count: player.entry_count,
        entry_wins: player.entry_wins,
        equipment_value: player.equipment_value,
        money_saved: player.money_saved,
        kill_reward: player.kill_reward,
        live_time: player.live_time,
        head_shot_kills: player.head_shot_kills,
        cash_earned: player.cash_earned,
        enemies_flashed: player.enemies_flashed,
    }));
}