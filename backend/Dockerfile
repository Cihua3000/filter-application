FROM gradle:8.4-alpine AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --info

FROM openjdk:21

EXPOSE 8080

RUN mkdir /app

COPY --from=build /home/gradle/src/build/libs/*.jar /app/spring-boot-application.jar
COPY src/main/resources/application.properties ./application.properties

CMD ["java", "-jar","/app/spring-boot-application.jar"]