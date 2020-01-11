package controllers

import javax.inject._
import models.Camp
import play.api.libs.json.Json
import play.api.mvc._
import services.CampService
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CampController @Inject()
(cc: ControllerComponents, campService: CampService)
(implicit ec: ExecutionContext) extends AbstractController(cc) {

  def list = Action.async { implicit request =>
    campService.list().map { camps =>
      Ok(Json.toJson(camps))
    }
  }
  def get(id: Int) = Action.async { implicit request =>
    campService.get(id).map { camp =>
      Ok(Json.toJson(camp))
    }
  }

  def delete(id: Int) = Action { implicit request =>
    println("Deleting camp: " + id)
    campService.delete(id)
    Ok
  }

  def create() = Action.async(parse.json) { implicit request =>
    (request.body).asOpt[Camp].map { camp =>
      campService.create(camp)
      Future.successful(Created)
    }.getOrElse {
      Future.successful(BadRequest("Wrong json structure for camp"))
    }
  }

}
