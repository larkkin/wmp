package com.qreal.wmp.db.diagram.test.dao;

import com.qreal.wmp.db.diagram.config.AppInit;
import com.qreal.wmp.db.diagram.dao.DiagramDao;
import com.qreal.wmp.db.diagram.exceptions.Aborted;
import com.qreal.wmp.db.diagram.exceptions.NotFound;
import com.qreal.wmp.db.diagram.model.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;
import static org.assertj.core.api.Assertions.*;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppInit.class})
@Transactional
public class DaoDiagramTest {
    @Autowired
    public DiagramDao diagramDao;

    //TODO how to divide this and third test?
    /** Test saveDiagram operation for diagram. */
    @Test
    @Rollback
    public void saveDiagram_correctDiagramAndFolder_diagramSavedInDb() throws Aborted, NotFound {
        Folder testFolder = createAndSaveFolder("testFolder", "testUser");

        Diagram testDiagram = new Diagram();
        testDiagram.setName("testDiagram");
        long idDiagramCreated = diagramDao.saveDiagram(testDiagram, testFolder.getId());
        testDiagram.setId(idDiagramCreated);

        Diagram gotDiagram = diagramDao.getDiagram(idDiagramCreated);

        assertThat(gotDiagram).isEqualTo(testDiagram);
    }

    /** Test saveDiagram operation for diagram. */
    @Test
    @Rollback
    public void saveDiagram_correctDiagramAndNotCorrectFolder_throwsAborted() {
        long idFolderNotCorrect = 0L;

        Diagram testDiagram = new Diagram();
        testDiagram.setName("testDiagram");

        assertThatThrownBy(() -> diagramDao.saveDiagram(testDiagram, idFolderNotCorrect)).isInstanceOf(Aborted.class);
    }

    //TODO how to divide this and first test?
    /** Test getDiagram operation for diagram. */
    @Test
    @Rollback
    public void getDiagram_diagramExists_gotDiagram() throws Aborted, NotFound {
        Folder testFolder = createAndSaveFolder("testFolder", "testUser");
        Diagram testDiagram = createAndSaveDiagram("testDiagram", testFolder);

        Diagram gotDiagram = diagramDao.getDiagram(testDiagram.getId());

        assertThat(gotDiagram).isEqualTo(testDiagram);
    }

    /** Test getDiagram operation for diagram. */
    @Test
    @Rollback
    public void getDiagram_diagramNotExists_throwsNotFound() throws Aborted, NotFound {
        long idDiagramNotCorrect = 0L;

        assertThatThrownBy(() ->  diagramDao.getDiagram(idDiagramNotCorrect)).isInstanceOf(NotFound.class);
    }

    /** Test deleteDiagram operation for diagram. */
    @Test
    @Rollback
    public void deleteDiagram_diagramExists_diagramDeletedFromDb() throws Aborted, NotFound {
        Folder testFolder = createAndSaveFolder("testFolder", "testUser");
        Diagram testDiagram = createAndSaveDiagram("testDiagram", testFolder);

        diagramDao.deleteDiagram(testDiagram.getId());

        assertThatThrownBy(() -> diagramDao.getDiagram(testDiagram.getId())).isInstanceOf(NotFound.class);
    }

    /** Test deleteDiagram operation for diagram. */
    @Test
    @Rollback
    public void deleteDiagram_diagramNotExists_throwsAborted() throws Aborted, NotFound {
        long idDiagramNotCorrect = 0L;

        assertThatThrownBy(() -> diagramDao.deleteDiagram(idDiagramNotCorrect)).isInstanceOf(Aborted.class);
    }

    /** Test isExistsDiagram operation for folder. */
    @Test
    @Rollback
    public void isExistsDiagram_diagramExists_returnsTrue() throws Aborted, NotFound {
        Folder testFolder = createAndSaveFolder("testFolder", "testUser");
        Diagram testDiagram = createAndSaveDiagram("testDiagram", testFolder);

        assertThat(diagramDao.isExistsDiagram(testDiagram.getId())).isTrue();
    }

    /** Test isExistsDiagram operation for folder. */
    @Test
    @Rollback
    public void isExistsDiagram_diagramNotExists_returnsFalse() throws Aborted, NotFound {
        long idDiagramNotCorrect = 0L;

        assertThat(diagramDao.isExistsDiagram(idDiagramNotCorrect)).isFalse();
    }

    /** Test rewriteDiagram operation for diagram. */
    @Test
    @Rollback
    public void rewriteDiagram_diagramExists_rewritesDiagramInDb() throws Aborted, NotFound {
        Folder testFolder = createAndSaveFolder("testFolder", "testUser");
        Diagram testDiagram = createAndSaveDiagram("testDiagram", testFolder);

        Diagram rewriteDiagram = new Diagram();
        rewriteDiagram.setName("testDiagramRewrite");
        rewriteDiagram.setId(testDiagram.getId());

        diagramDao.rewriteDiagram(rewriteDiagram);

        Diagram gotDiagram = diagramDao.getDiagram(testDiagram.getId());

        assertThat(gotDiagram).isEqualTo(rewriteDiagram);
    }

    /** Test rewriteDiagram operation for diagram. */
    @Test
    @Rollback
    public void rewriteDiagram_diagramNotExists_throwsAborted() throws Aborted, NotFound {
        Long diagramIdNotCorrect = 0L;

        Diagram rewriteDiagram = new Diagram();
        rewriteDiagram.setName("testDiagramRewrite");
        rewriteDiagram.setId(diagramIdNotCorrect);

        assertThatThrownBy(() -> diagramDao.rewriteDiagram(rewriteDiagram)).isInstanceOf(Aborted.class);
    }

    private Folder createAndSaveFolder(String nameOfFolder, String nameOfUser) throws Aborted {
        Folder testFolder = new Folder(nameOfFolder, nameOfUser);
        long idFolderCreated = diagramDao.saveFolder(testFolder);
        testFolder.setId(idFolderCreated);
        return testFolder;
    }

    private Diagram createAndSaveDiagram(String nameOfDiagram, Folder folder) throws Aborted {
        Diagram testDiagram = new Diagram();
        testDiagram.setName(nameOfDiagram);
        long idDiagramCreated = diagramDao.saveDiagram(testDiagram, folder.getId());
        testDiagram.setId(idDiagramCreated);
        return testDiagram;
    }
}
