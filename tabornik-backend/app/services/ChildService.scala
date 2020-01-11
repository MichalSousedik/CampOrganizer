package services

import dao.ChildDAO
import javax.inject.Inject
import models.Child

import scala.concurrent.Future

class ChildService @Inject()(childDAO: ChildDAO){

  def update(child: Child) = childDAO.update(child)

  def create(child: Child) = childDAO.create(child)

  def delete(id: Int) = childDAO.delete(id)

  def list(campId: Int): Future[Seq[Child]] = childDAO.list(campId)

}
