package services

import dao.{CampDAO, CampWorkerDAO}
import javax.inject.Inject
import models.{Camp, CampWorker, Worker}

import scala.concurrent.Future

class CampWorkerService @Inject()(campWorkerDAO: CampWorkerDAO){

  def delete(campId: Int, workerId: Int): Unit = {
    campWorkerDAO.delete(campId, workerId)
  }

  def listPending(campId: Int): Future[Seq[(Worker, String)]] = campWorkerDAO.listWorkers(campId, true)

  def listCurrent(campId: Int): Future[Seq[(Worker, String)]] = campWorkerDAO.listWorkers(campId, false)

  def update(campWorker: CampWorker) = {
    campWorkerDAO.delete(campWorker.campId, campWorker.workerId);
    campWorkerDAO.create(campWorker)
  }

  def create(campWorker: CampWorker) = campWorkerDAO.create(campWorker)

}
