package services

import dao.CampDAO
import javax.inject.Inject
import models.{Camp, CampDetail, Worker}

import scala.concurrent.{ExecutionContext, Future}

class CampService @Inject() (campDAO: CampDAO, campWorkerService: CampWorkerService)(implicit ec: ExecutionContext){
  def get(id: Int): Future[CampDetail] = {
    for {
      camp <-campDAO.get(id)
      workers <- campWorkerService.listCurrent(id)
      leader <- findWorkerBasedOnPosition(workers, "Vedoucí")
      medic <- findWorkerBasedOnPosition(workers, "Zdravotník")
      backup <- findWorkerBasedOnPosition(workers, "Zástupce vedoucího")
    } yield CampDetail(camp, leader, medic, backup)
  }


  private def findWorkerBasedOnPosition(workers: Seq[(Worker, String)], pos: String): Future[String] = {
    Future {
      workers.find { case (_, position) => position == pos }.map(_._1.name).getOrElse("Neexistuje")
    }
  }

  def create(camp: Camp): Unit = {
    campDAO.create(camp)
  }

  def delete(id: Int): Unit = {
  campDAO.delete(id)
  }

  def list(): Future[Seq[Camp]] = {
    campDAO.list()
  }
}
