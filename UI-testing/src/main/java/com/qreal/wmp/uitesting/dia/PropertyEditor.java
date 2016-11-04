package com.qreal.wmp.uitesting.dia;

import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.By;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.OptionalInt;
import java.util.stream.IntStream;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.$$;

/** Describe Property Editor. */
@Service
public class PropertyEditor {

    private static final String selector = "#property_table";

    /** Set property of element which on the focus. */
    public void setProperty(final String propertyName, final String propertyValue) {
        getInputOfElement(propertyName).setValue(propertyValue);
    }

    /** Return the value of property by name. */
    public String getProperty(final String propertyName) {
        return getInputOfElement(propertyName).getValue();
    }

    /** To set/get property we need to take web element which describes needed field. */
    private SelenideElement getInputOfElement(final String propertyName) {
        final List<SelenideElement> allChilds = $$(By.cssSelector(selector + " tbody > * > *"));
        final OptionalInt indexOfNeeded = IntStream.range(0, allChilds.size()).filter(index ->
                allChilds.get(index).getText().equals(propertyName)).findFirst();
        assert indexOfNeeded.isPresent();
        return $(By.cssSelector(selector + " tbody > * > *:nth-of-type("
                + (indexOfNeeded.getAsInt() + 2) + ") > * > *" ));
    }
}
