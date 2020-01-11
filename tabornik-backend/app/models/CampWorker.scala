package models

import play.api.libs.json.Json

object CampWorker {
  implicit val format = Json.format[CampWorker]
}

case class CampWorker(campId: Int, workerId: Int, pending: Boolean, position: String)


object CampWorkerUnit {
  implicit val format = Json.format[CampWorkerUnit]
}
case class CampWorkerUnit(worker: Worker, position: String)

