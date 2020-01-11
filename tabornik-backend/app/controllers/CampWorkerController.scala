package controllers

import javax.inject._
import models.{CampWorker, CampWorkerUnit, Worker}
import play.api.libs.json.Json
import play.api.mvc._
import services.CampWorkerService

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CampWorkerController @Inject()(cc: ControllerComponents, campWorkerService: CampWorkerService)(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def listPending(campId: Int) = Action.async { request =>
    campWorkerService.listPending(campId).map { workers =>
      Ok(Json.toJson(makeUnit(workers)))
    }
  }

  private def makeUnit(workers: Seq[(Worker, String)]) = {
    val campWorkerUnits = workers.map(unit =>
      CampWorkerUnit(unit._1, unit._2)
    )
    campWorkerUnits
  }

  def listCurrent(campId: Int) = Action.async { request =>
    campWorkerService.listCurrent(campId).map { workers =>
      Ok(Json.toJson(makeUnit(workers)))
    }
  }

  def delete(campId: Int, workerId: Int) = Action.async { request =>
    campWorkerService.delete(campId, workerId)
    Future.successful(Ok)
  }

  def update = Action.async(parse.json) { request =>
    (request.body).asOpt[CampWorker].map { campWorker =>
      campWorkerService.update(campWorker)
      Future.successful(Ok)
    }.getOrElse {
      Future.successful(BadRequest("Wrong json structure for campworker"))
    }
  }

  def create = Action.async(parse.json) { request =>
    (request.body).asOpt[CampWorker].map { campWorker =>
      campWorkerService.create(campWorker)
      Future.successful(Ok)
    }.getOrElse {
      Future.successful(BadRequest("Wrong json structure for campworker"))
    }
  }
}
