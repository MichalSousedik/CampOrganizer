package controllers

import javax.inject._
import models.Child
import play.api.libs.json.Json
import play.api.mvc._
import services.ChildService

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ChildController @Inject()
(cc: ControllerComponents, childService: ChildService)
(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def list(campId: Int) = Action.async { implicit request =>
    childService.list(campId).map { children =>
      Ok(Json.toJson(children))
    }
  }

  def delete(id: Int) = Action { implicit request =>
    childService.delete(id)
    Ok
  }

  def update() = Action.async(parse.json) { implicit request =>
    (request.body).asOpt[Child].map { child =>
      childService.update(child)
      Future.successful(Created)
    }.getOrElse {
      Future.successful(BadRequest("Wrong json structure for child"))
    }
  }

  def create() = Action.async(parse.json) { implicit request =>
    (request.body).asOpt[Child].map { child =>
      childService.create(child)
      Future.successful(Created)
    }.getOrElse {
      Future.successful(BadRequest("Wrong json structure for child"))
    }
  }
}
