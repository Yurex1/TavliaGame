enum PlayerRole {
    Attacker,
    Defender
}

export default class Player {
    public role: PlayerRole;
    public id: string;
    constructor(role: PlayerRole, id: string) {
        this.role = role;
        this.id = id;
    }

}