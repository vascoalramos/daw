<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Arqueossitio - Base de Dados de Povoações Arqueológicas</title>
                </head>
                <body>
                    <h2>Arqueossitio - Base de Dados de Povoações Arqueológicas</h2>
                    <h3>Índice de Títulos</h3>
                    <ul>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"></xsl:sort>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
        
        <!--  
        <xsl:apply-templates/>  Para criar as outras páginas
        -->
    </xsl:template>
    
    <!-- Templates de Índice ............................................... -->
    
    <xsl:template match="." mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates para o conteúdo ......................................... -->
    
    <xsl:template match="doc">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="tit"/></title>
                </head>
                <body>
                    <p><b>Título: </b> <xsl:value-of select="tit"/></p>
                    <p><b>Província: </b> <xsl:value-of select="prov"/></p>
                    <p><b>Local: </b> <xsl:value-of select="local"/></p>
                    <p><b>Instrumento: </b> <xsl:value-of select="inst"/></p>
                    <p><b>Músico: </b> <xsl:value-of select="musico"/></p>
                    <address>
                        [<a href="index.html#i{generate-id()}">Voltar à Home</a>]
                    </address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
</xsl:stylesheet>