export class CampWorker {
    campId: number;
    workerId: number;
    position: String;
    pending: Boolean;

    constructor(campId: number, workerId: number, position: String, pending: Boolean) {
        this.campId = campId;
        this.workerId = workerId;
        this.position = position;
        this.pending = pending;
    }
}
