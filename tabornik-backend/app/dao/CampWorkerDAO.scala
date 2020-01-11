package dao

import javax.inject.Inject
import models.{CampWorker, Worker}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

class CampWorkerDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, workerDAO: WorkerDAO)(implicit executionContext: ExecutionContext) extends HasDatabaseConfigProvider[JdbcProfile] {

  import profile.api._

  private val campWorkers = TableQuery[CampWorkersTable]

  def listWorkers(campId: Int, pending: Boolean): Future[Seq[(Worker, String)]] = db.run {
    val x = campWorkers.filter(_.campId === campId)
      .filter(_.pending === pending)
    val innerJoin = for {
      (c, s) <- x join workerDAO.workers on (_.workerId === _.id)
    } yield (s, c.position)
    innerJoin.result
  }

  def delete(campId: Int, workerId: Int): Unit = db.run {
    val campWorker = campWorkers.filter(_.campId === campId)
      .filter(_.workerId === workerId)
    campWorker.delete
  }

  def update(campWorker: CampWorker) = db.run {
    campWorkers.update(campWorker)
  }

  def create(campWorker: CampWorker) = db.run {
    campWorkers += campWorker
  }

  private class CampWorkersTable(tag: Tag) extends Table[CampWorker](tag, "CAMP_WORKER") {
    def campId = column[Int]("CAMPID", O.PrimaryKey)
    def workerId = column[Int]("WORKERID", O.PrimaryKey)
    def position = column[String]("POSITION")
    def pending = column[Boolean]("PENDING")

    def * = (campId, workerId, pending, position) <> ((CampWorker.apply _).tupled, CampWorker.unapply)

  }

}

